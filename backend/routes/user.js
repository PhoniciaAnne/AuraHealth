const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { location, healthHistory, workEnvironment } = req.body;
    await User.create({ location, healthHistory, workEnvironment });
    res.json({ message: "User profile created successfully" });
});

module.exports = router;
