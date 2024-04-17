
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
module.exports.doctorNurse = (req, res) => {
    res.render("client/pages/doctor-nurse/index.pug");
}