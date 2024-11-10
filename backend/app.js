const express = require('express');
const mongoose = require('mongoose');
const healthRoutes = require('./routes/health');
const userRoutes = require('./routes/user');
//  const openaiRoutes = require('./routes/openai');
const cron = require('./dailyTipCron');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/openai', openaiRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

module.exports = app;
