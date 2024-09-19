const dotenv = require('dotenv');

const jwt = require("jsonwebtoken");

dotenv.config();


function setUser(user) {
    // Generate a JWT (JSON Web Token) for the authenticated user
    // The token will include the user's ID, email, and role in its payload
    return jwt.sign(
        { 
            id: user._id,       // The unique identifier (ObjectId) of the user from MongoDB
            email: user.email, 
            role: user.role    
        }, 
        process.env.SECRET_KEY,             // The secret key used to sign the token (for security)
        { expiresIn: '1h' }     // The token will expire in 1 hour
    ); 
}


function getUser(token) {
    if (!token) {
        return null;
    }

    try {
        // Verify the token with the secret key and return the decoded user object
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.error("Invalid or expired token:", error.message);
        return null; // Return null if the token is invalid or expired
    }
}

module.exports = {
    setUser, getUser
};