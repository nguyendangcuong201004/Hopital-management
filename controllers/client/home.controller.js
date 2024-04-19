
const DoctorNurse = require("../../models/doctor-nurse.model.js");

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