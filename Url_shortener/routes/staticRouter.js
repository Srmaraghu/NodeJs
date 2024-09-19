const express = require("express");
const URL = require("../models/url")
const {restrictTo, checkForAuthentication} = require("../middleware/auth")

const router = express.Router();


router.get("/admin/urls",restrictTo(["Admin"]),async(req,res)=>{
    const allurls= await URL.find();


    return res.render("home.ejs",{
        allurls:allurls
    });
}
)


router.get("/", restrictTo(["Normal","Admin"]),async (req,res)=>{

    const allurls= await URL.find({createdBy: req.user._id});


    return res.render("home.ejs",{
        allurls:allurls
    });
})
router.get("/signup",async (req,res)=>{
    return res.render("signup.ejs");
})


router.get("/login" , async(req,res)=>{
 return res.render("login.ejs")
});

router.get("/logout", (req, res) => {
    // Clear the token cookie by setting it to an empty string with immediate expiration
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    // Redirect to the login page
    return res.redirect("/login");
});

module.exports =router ;