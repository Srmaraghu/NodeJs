const mongoose = require('mongoose');
const { createHmac, randomBytes } = require("crypto");
const {  createTokenForUser , validateToken}  = require("../services/authentication");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },

    password: {
        type: String,
        required: true,
        minlength: 4
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    const user = this;// 'this' refers to the current document (user)

    // If the password is not modified, skip the hashing process
    if (!user.isModified('password')) return next();

    // Generate a random salt using the crypto module
    const salt = randomBytes(16).toString();


    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");


    // Assign the generated salt and hashed password to the user document
    this.salt = salt;
    this.password = hashedPassword;

    next();


})

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return false;

    const salt = user.salt;
    const hashedPassword = user.password;

    // Hash the provided password with the stored salt to check if it matches
    const userProvidedHash = createHmac('sha256', salt).update(password).digest("hex");

    if (hashedPassword !== userProvidedHash) {
        throw new Error("Invalid password");
    }

    const token= createTokenForUser(user);
    return token;
});


const User = mongoose.model('user', userSchema)

module.exports = User;