require('dotenv').config();



const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
const { Client, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi ,OpenAI} = require("openai");
require('dotenv').config();

const express = require("express");
const URL = require("./models/url")
const connectToMongoDb = require("./connect.js")
const { handleGenerateNewShortUrl } = require("./controllers/url.js")


const app = express();
// 1. Replace MongoDB URL with an environment variable
connectToMongoDb(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => console.error("Couldn't connect to MongoDB  ", error));


//client is your bot that will connect to Discord and do whatever it's programmed to do.

//GatewayIntentBits is an object that contains constants representing different types of intents. For example, GatewayIntentBits.Guilds is an intent that allows your bot to receive events related to guilds (servers), like when the bot joins a new server or when a server's settings change.
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


  // Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

client.on("messageCreate", async (message) => {
    // console.log(message.content);

    if (message.author.bot) {
        return; //do nothing when a bot replies
    }

    if (message.content.startsWith("create")) {
        const url = message.content.split("create")[1].trim();

        if (url) {
            try {
                const req = { body: { url } };

                const shortUrl = await handleGenerateNewShortUrl(req);
                // console.log(shortUrl);

                return message.reply({ content: "Short Url: " + shortUrl });

            } catch (err) {
                console.error("Error generating short url: " + err.message)
                return message.reply({ content: "Error generating short url. Please make sure the URL is valid." });
            }
        }
        else {
            return message.reply({ content: "Please provide a valid URL after the 'create' command." });
        }

    }
    
    if (message.content.startsWith("ask")) {
        const question = message.content.split("ask")[1]?.trim(); // Use optional chaining
        if (question) {
           try {
                const chatSession = model.startChat({
                    generationConfig,
                    history: [],
                });

                const result = await chatSession.sendMessage(question);
                return message.reply({ content: result.response.text().trim() });
            } catch (err) {
                console.error("Error asking Gemini: " + err.message);
                return message.reply({ content: "Error asking Gemini. Please try again." });
            }
        }
        else {
                return message.reply({ content: "Please provide a valid question after the 'ask' command." });
            }

    }
    //     default reply 
    message.reply({ content: "Hi from Bot" });


});

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (entry) {
        res.redirect(entry.redirectUrl);
    } else {
        res.status(404).send("URL not found");
    }
});


client.on("interactionCreate", interaction => {
    console.log(interaction);
    interaction.reply("Pong!!")
});

client.login(process.env.DISCORD_TOKEN);

const port = 8001;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

