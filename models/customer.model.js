const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    fullName: String,
    birth: String,
    sex: String,
    cccd: String,
    phone: String,
    email: String,
    diaChiNha: String,
    macBenh: String,
    id: String,
    anhnhanvien: String,
    tien_su_benh: String,
    BHYT: String
});

const Customer = mongoose.model('Customer', CustomerSchema, "customer");

module.exports = Customer;