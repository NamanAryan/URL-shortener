const { v4: uuidv4 } = require('uuid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = uuidv4().slice(0, 8);
    console.log(`Generated short ID: ${shortId}`);

    try {
        const newURL = await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
        });
        console.log('New URL created:', newURL);
        return res.json({ id: shortId });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleGenerateNewShortURL,
};
