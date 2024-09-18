const mongoose = require("mongoose");

// Define a schema (structure) for storing URL data in MongoDB
const urlSchema = new mongoose.Schema({
    // `shortId` is a unique identifier for the shortened URL
    shortId: { 
        type: String, 
        required: true, 
        unique: true,
    },

    // `redirectUrl` is the original URL that the shortened link will redirect to
    redirectUrl: { 
        type: String, 
        required: true 
    }

    
}, 

{ timestamps: true })

// Create a model named 'URL' using the schema, to interact with the "url" collection in the database
const URL = mongoose.model("url", urlSchema);

module.exports = URL;
