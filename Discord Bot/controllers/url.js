const shortidpkg = require("shortid");
const URL = require("../models/url")
const port=8001;

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return ({ error: "URL is required" })
    }

    const trimmedUrl= body.url.trim();
    const encodedUrl =encodeURI(trimmedUrl)


    const shortID = shortidpkg(8);

    // Create a new entry in the database with the short ID, the original URL, and an empty visit history
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,

    });

    return `http://localhost:${port}/${shortID}`;    
    
    
}


module.exports = {
    handleGenerateNewShortUrl,
}