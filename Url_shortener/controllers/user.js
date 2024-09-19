const { v4: uuidv4 } = require("uuid");

const { User } = require("../models/user");
const { setUser } = require("../service/auth")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create({ name, email, password });
        return res.redirect("/");
    } catch (error) {
        console.error("Error during user sign-up:", error);
        return res.status(500).send("Internal Server Error");
    }
}



async function handleUserLogIn(req, res) {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email, password });


        if (!user) {
            return res.render("login.ejs", {
                error: "Invalid Username or Password"
            })
        }


        const token = setUser(user);

        // Set the JWT token in a cookie for future requests
        res.cookie("token", token )
        return res.redirect("/");
    }
    catch (err) {
        console.error("Error during user login:", err);
        return res.status(500).send("Internal Server error")
    }
}

module.exports = { handleUserSignUp, handleUserLogIn };
