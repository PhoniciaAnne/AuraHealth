// routes/openai.js

const express = require('express');
const { OpenAIApi, Configuration } = require('openai');
const router = express.Router();

// Initialize OpenAI with configuration using an API key from environment variables
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,  // Ensure your .env file has this key
});
const openai = new OpenAIApi(configuration);

// Define a route for generating a response using OpenAI
router.post('/generate-response', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',  // Specify the correct model
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
        });

        const aiResponse = response.data.choices[0].text.trim();
        res.json({ response: aiResponse });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ message: "Error generating AI response" });
    }
});

module.exports = router;
