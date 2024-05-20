const express = require("express");
const multer  = require('multer');
const manageMedicineControllers= require("../../controllers/client/manage-medicine.controllers.js")
const customerController = require('../../controllers/client/customer.controller.js');
const controller = require("../../controllers/client/home.controller.js");
const adminAccount = require("../../controllers/admin/account.controller.js");




const router = express.Router();
const bcrypt = require('bcrypt');

const uploadCloud = require("../../helpers/uploadCloud.js");
const upload = multer();

router.get("/", controller.index);

router.get('/management-customer', customerController.managementCustomer);
router.get('/management-customer/create', customerController.createCustomer);
router.post('/management-customer/create', customerController.createCustomerPost);
router.get('/management-customer/delete', customerController.deleteCustomer);
router.post('/management-customer/delete', customerController.deleteCustomerPost);
router.get('/management-customer/edit', customerController.EditCustomer);
router.post('/management-customer/edit', customerController.EditCustomerPost);
module.exports = router;

router.get("/doctor-nurse", controller.doctorNurseUnlogin);

// router.get("/doctor-nurse/dashboard", controller.doctorNurse);

router.get("/doctor-nurse/create", controller.doctorNurseCreate);

router.get("/login", controller.accountLogin);

router.get("/admin/login", controller.accountLoginAdmin);


router.get("/admin/accounts", controller.accountAdminAccounts);

router.get("/register", controller.accountRegister);

router.post("/doctor-nurse/create",  controller.doctorNurseCreatePost);

router.get("/doctor-nurse/edit/:id",  controller.doctorNurseEdit);

router.patch("/doctor-nurse/edit/:id",  controller.doctorNurseEditPatch);

router.delete("/doctor-nurse/delete/:id",  controller.doctorNurseDelete);

router.post("/register", controller.userAccountPost);

router.post("/login", controller.userAccountLoginPost)

router.get('/manage-medicine', manageMedicineControllers.index);

router.get('/manage-medicine/add-medicine', manageMedicineControllers.addProduct);


router.post('/manage-medicine/add-medicine', manageMedicineControllers.addProductPost);

router.delete('/manage-medicine/add-medicine/delete-add-product/:id', manageMedicineControllers.deleteAddProduct);

router.patch('/manage-medicine/add-medicine/add-all-products', manageMedicineControllers.addAllProduct);

router.delete('/manage-medicine/delete-product/:id', manageMedicineControllers.deleteProduct);

router.get('/forgotPasswordRequest', controller.forgotPasswordRender);
router.post('/forgotPassword', controller.forgotPassword);
router.get('/resetPassword/:token', controller.resetPassword);
router.patch('/resetPassword/:token', controller.resetPassword);



module.exports = router;
