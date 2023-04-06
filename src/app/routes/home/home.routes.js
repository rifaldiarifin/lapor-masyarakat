"use strict"

const express = require("express");
const homeControllers = require("../../controllers/home/home.controller");
const router = express.Router();

router.get("/", homeControllers.mainSPA);

router.get("/forms", homeControllers.formsSPA);
router.post("/forms/signin", homeControllers.signin);

router.get("/backsignin", homeControllers.backsignin);

router.get("/signup", homeControllers.signup);
router.post("/signup/buatakun", homeControllers.buatakun);

router.get("/signup/informasipersonal", homeControllers.informasipersonal);

router.get("/signup/lokasialamat", homeControllers.lokasialamat);

router.get("/signup/nomortelepon", homeControllers.nomortelepon);

router.get("/signup/aturprofil", homeControllers.aturprofile);

router.get("/signup/penyelesaianakhir", homeControllers.penyelesaianakhir);

router.get("/signup/signupsuccess", homeControllers.signupsuccess);


module.exports = router;