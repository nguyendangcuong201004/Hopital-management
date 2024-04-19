const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userCollection = mongoose.model('userAccount', userAccountSchema, "account");

module.exports = userCollection;