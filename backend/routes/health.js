const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/predict-health-risk', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        console.error("Error in prediction request:", error);
        res.status(500).json({ message: "Error in prediction request" });
    }
});

module.exports = router;
