require('dotenv').config();  // Load environment variables


const express = require("express");
const path= require("path");
const cookieParser = require("cookie-parser");
const connectToMongoDb = require("./connect.js");


const Blog = require('./models/blog');

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const checkForAuthenticationCookie = require("./middlewares/authentication.js");

const app =express();
const port=process.env.PORT  || 8000;



app.use(express.json());
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.join(__dirname, 'public')));


connectToMongoDb(process.env.MONGO_URL).then(() =>
    console.log("Connected to MongoDB")
).catch((error) => console.error("Couldn't connect to MongoDB  ", error));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.get("/", async (req, res) => {
    try {
        const allBlogs = await Blog.find({})
            .sort("createdAt")
            .populate("author", "fullName"); // Populates the author field with the fullName of the user

        return res.render("home.ejs", {
            user: req.user,
            allBlogs: allBlogs
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.listen(port,()=>console.log("listening on port",port));