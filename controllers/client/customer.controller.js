const Customer = require("../../models/customer.model.js");
const DoctorNurse = require("../../models/doctor-nurse.model.js");
// Display customers on management page
module.exports.managementCustomer = async (req, res) => {
    const customers = await Customer.find();
    res.render("client/pages/customer/management-customer-unlogin.pug", {
        customers: customers
    });
    // res.render("client/pages/customer/new_index.pug", {
    //     customers: customers
    // });
};
module.exports.EditCustomerPost = async (req, res) => {
    const { fullName, phone } = req.body;
    const customer = await Customer.findOne({ fullName: fullName, phone: phone });
    console.log(customer);
    res.render("client/pages/customer/new_index.pug", {
        customer: customer
    });
    //res.redirect("/management-customer");
};
module.exports.EditCustomer =   (req, res) => {
    res.render("client/pages/customer/find-cus.pug");
};
//  [GET]
module.exports.createCustomer = (req, res) => {
    res.render("client/pages/customer/nhap-cus.pug");
};

// [POST]
module.exports.createCustomerPost = async (req, res) => {
    // const newCustomer = new Customer(req.body);
    // await newCustomer.save();
    // res.redirect("/management-customer");
    const newCustomer = new Customer(req.body);
    await newCustomer.save(); 

    // Tim kiem bac si phu hop
    const activeDoctorNurse = await DoctorNurse.findOne({ active: true });  
    //
    if (activeDoctorNurse) {
        console.log(activeDoctorNurse);
        activeDoctorNurse.customers.push(newCustomer._id);  
        await activeDoctorNurse.save();
    } else {
        console.log('No active doctors or nurses available to assign the customer to.');
    }

    res.redirect("/management-customer");
};

// DEL
module.exports.deleteCustomer = (req, res) => {
    res.render("client/pages/customer/del-cus.pug");
};

module.exports.deleteCustomerPost = async (req, res) => {
    const { fullName, phone } = req.body;
    await Customer.findOneAndDelete({ fullName: fullName, phone: phone });
    
    res.redirect("/management-customer");
};