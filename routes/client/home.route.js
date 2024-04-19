const express = require("express");

const controller = require("../../controllers/client/home.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/management-customer", controller.managementCustomer);

router.get("/doctor-nurse", controller.doctorNurse);

router.get("/doctor-nurse/create", controller.doctorNurseCreate);

router.post("/doctor-nurse/create", controller.doctorNurseCreatePost);

module.exports = router;