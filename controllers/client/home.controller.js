
const DoctorNurse = require("../../models/doctor-nurse.model.js");
const userCollection = require("../../models/account.js");
const bcrypt = require('bcrypt');

// [GET] /
module.exports.index = (req, res) => {
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang Chu"
    });
}

// [GET] /management-customer
module.exports.managementCustomer = (req, res) => {
    res.render("client/pages/customer/management-customer.pug");
}

// [GET] /doctor-nurse
module.exports.doctorNurse = async (req, res) => {

    const records = await DoctorNurse.find();

    res.render("client/pages/doctor-nurse/index.pug", {
        records: records
    });
}

// [GET] /doctor-nurse/create
module.exports.doctorNurseCreate = (req, res) => {
    res.render("client/pages/doctor-nurse/nhap-nurse.pug");
}

// [POST] /doctor-nurse/create
module.exports.doctorNurseCreatePost = async (req, res) => {

    const newRecord = new DoctorNurse(req.body);

    await newRecord.save();

    res.redirect("back")
}

// [GET] /login
module.exports.accountLogin= (req, res) => {
    res.render("client/pages/register-login/login.pug");
}
// [POST] /register

module.exports.userAccountPost = async (req, res) => {
    // salt Rounds
    const saltRounds = 10;
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await userCollection.findOne({name: data.name});
    if (existingUser) {
        res.send("Tài khoản đã tồn tại");
    }
    else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        req.body.password = hashedPassword;
        const newRecord = new userCollection(req.body);
        await newRecord.save();
    }
    res.redirect("back");
}

// [POST] /login

// module.exports.userAccountLoginPost = async (req, res) => {
//     // salt Rounds

//     const check = await userCollection.findOne(req.body.username);
//     const isPasswordMatched = await bcrypt.compare(req.body.password, check.password);
//     if (isPasswordMatched) {
//         res.send("Hello shop");
//     }
// }

// [GET] /register
module.exports.accountRegister= (req, res) => {
    res.render("client/pages/register-login/register.pug");
}