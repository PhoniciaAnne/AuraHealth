const mongoose = require('mongoose');

const CommunityHealthSchema = new mongoose.Schema({
    symptom: String,
    location: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommunityHealth', CommunityHealthSchema);
