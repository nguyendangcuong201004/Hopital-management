
const DoctorNurse = require("../../models/doctor-nurse.model.js");
const userCollection = require("../../models/account.js");
const bcrypt = require('bcrypt');

//[GET] 
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
    const existingUser = await userCollection.findOne({username: req.body.username});
    if (existingUser) {
        res.send("Tài khoản đã tồn tại");
    }
    else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        req.body.password = hashedPassword;
        const newRecord = new userCollection(req.body);
        await newRecord.save();
        res.redirect("back");
    }
}

// [POST] /login

module.exports.userAccountLoginPost = async (req, res) => {
    // salt Rounds
    const findUsername = await userCollection.findOne({username: req.body.username});
    if (!findUsername) {
        res.send("Sai mat khau");
    }
    else {
        const isPasswordMatch = await bcrypt.compare(req.body.password, findUsername.password);
        if (isPasswordMatch) {
            res.redirect("doctor-nurse");
        }
        else {
            res.send("Tài khoản hoặc mật khẩu không đúng");
        }
    }

}

// [GET] /register
module.exports.accountRegister= (req, res) => {
    res.render("client/pages/register-login/register.pug");
}