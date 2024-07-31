const URL = require('../models/url');

function generateShortId(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters[randomIndex];
    }
    return shortId;
}

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    let shortID;
    let isUnique = false;
    while (!isUnique) {
        shortID = generateShortId();
        console.log(`Generated potential short ID: ${shortID}`);
        const existingUrl = await URL.findOne({ shortID });
        if (!existingUrl) {
            isUnique = true;
        }
    }
    console.log(`Final short ID: ${shortID}`);
    try {
        const newURL = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        console.log('New URL created:', newURL);
        res.redirect('/');
        return res.render("index",{
            id: shortID,
        });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleGenerateNewShortURL,
};
