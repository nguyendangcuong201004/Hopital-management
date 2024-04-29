const mongoose = require("mongoose");
const generate = require("../helpers/generate.js");
const crypto = require('crypto');

const userAccountSchema = new mongoose.Schema(
    {
    fullName: String,
    email: String,
    username: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(20) 
    },
    phone: String,
    avatar: String,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deleteAt: Date,

},
{
    timestamps: true,
}
);

userAccountSchema.methods.createPasswordToken = function(){

    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;


    return resetToken;
}

const userCollection = mongoose.model('userAccount', userAccountSchema, "account");

module.exports = userCollection;