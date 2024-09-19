const {Router} = require('express');
const User = require("../models/user");
const router = Router();


router.get("/signin",(req,res)=>{
    return res.render("signin.ejs");
})

router.get("/signup",(req,res)=>{
    return res.render("signup.ejs");
});

router.post("/signup", async (req,res)=>{
const { fullName, email , password}  = req.body;   

try {
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/user/signin"); // Redirect to sign-in page after successful sign-up
} catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).send("Error during sign-up");
}
});


router.post("/signin",async (req,res)=>{
    const {email, password} = req.body;
    try {
        const token = await  User.matchPasswordAndGenerateToken(email, password); 

     return res.cookie("token",token).redirect("/"); // Redirect to home after  generating token

    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.render("signin",{error:"Incorrect Email or password"})
    }

});

router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    return res.redirect("/user/signin"); // Redirect to sign-in page after logout

})




module.exports=router;