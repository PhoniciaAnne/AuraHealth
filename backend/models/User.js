const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    location: String,
    healthHistory: String,
    workEnvironment: String,
});

module.exports = mongoose.model('User', UserSchema);
