const Customer = require("../../models/customer.model.js");

// Display customers on management page
module.exports.managementCustomer = async (req, res) => {
    const customers = await Customer.find();
    res.render("client/pages/customer/management-customer.pug", {
        customers: customers
    });
};

//  [GET]
module.exports.createCustomer = (req, res) => {
    res.render("client/pages/customer/nhap-cus.pug");
};

// [POST]
module.exports.createCustomerPost = async (req, res) => {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.redirect("/management-customer");
};