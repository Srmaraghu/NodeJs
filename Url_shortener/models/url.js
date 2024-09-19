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
    redirectUrl: { type: String, required: true, unique: true },

    
    // `visitHistory` is an array that stores the timestamps of each visit to the shortened URL
    visitHistory: [{
        timestamp: { 
            type: Number 
        }
    }],

    // `createdBy` stores the ID of the user who created the shortened URL
    // `type: mongoose.Schema.Types.ObjectId` means it stores an ObjectId (unique identifier)
    // `ref: "users"` indicates that this ObjectId references a document in the "users" collection
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
}, 

{ timestamps: true })

// Create a model named 'URL' using the schema, to interact with the "url" collection in the database
const URL = mongoose.model("url", urlSchema);

// Export the URL model so it can be used in other parts of the application
module.exports = URL;
