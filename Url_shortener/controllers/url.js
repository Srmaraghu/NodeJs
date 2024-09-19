const shortidpkg = require("shortid");
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" })
    }


    const shortID = shortidpkg(8);

    // Create a new entry in the database with the short ID, the original URL, and an empty visit history
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,

    });

    const allUrls = await URL.find({});
    
    
    // Respond to the client with the generated short ID and table of generated URLS
    return res.render("home.ejs",{
        id:shortID,
        allurls: allUrls
    } )
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length,
                    analytics:result.visitHistory,
    });
}


module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}