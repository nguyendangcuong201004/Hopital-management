const express = require("express");

const controller = require("../../controllers/client/home.controller.js");

const router = express.Router();
const bcrypt = require('bcrypt');

router.get("/", controller.index);

router.get("/management-customer", controller.managementCustomer);

router.get("/doctor-nurse", controller.doctorNurse);

router.get("/doctor-nurse/create", controller.doctorNurseCreate);

router.get("/login", controller.accountLogin);

router.get("/register", controller.accountRegister);

router.post("/doctor-nurse/create", controller.doctorNurseCreatePost);

router.post("/register", controller.userAccountPost);

// router.post("/login", controller.userAccountLoginPost)

module.exports = router;