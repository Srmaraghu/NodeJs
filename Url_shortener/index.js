const express = require("express");
const  path= require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url")  //Import the URL model to interact with the URL collection in MongoDB
const cookieParser= require("cookie-parser");
const {restrictTo, checkForAuthentication} = require("./middleware/auth.js")
const urlRoute = require("./routes/url");
const staticRoute= require("./routes/staticRouter")
const userRoute= require("./routes/user");

const app = express();

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDb connected")).catch(err=>console.log("MongoDb Connection error"));

app.set("view engine","ejs"); //Using EJS as view Engine
app.set("views",path.resolve("./views"));// Defining to express the location of views


// Serve static files from the "node_modules" directory
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(express.urlencoded({extended:false}));// to pass form data
app.use(cookieParser());//When a user logs in, a JWT (JSON Web Token) is created and stored in a cookie (e.g., token). The cookieParser() middleware extracts this cookie from the incoming request and makes it available on req.cookies.
app.use(express.json());  // Middleware to parse incoming JSON requests




app.use(checkForAuthentication);

app.use("/url", restrictTo(["Normal","Admin"]),urlRoute);  // Use the routes defined in the `urlRoute` file for any request starting with `/url`
app.use("/",staticRoute);//routes for static templates
app.use("/user",userRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        // Find the URL entry in the database by shortId and update its visit history with the current timestamp
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );

        if (entry) {
            // Redirect the user to the original URL
            res.redirect(entry.redirectUrl);
        } else {
            // If no entry is found, return a 404 response
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error handling redirection:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


const port = 8001;


app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});