"use strict"

const express = require("express");
const petugasControllers = require("../../controllers/petugas/petugas.controller");
const router = express.Router();

router.get("/petugas", petugasControllers.mainSPA);
router.get("/petugas/beranda", petugasControllers.beranda);
router.get("/petugas/infopersonal", petugasControllers.infopersonal);

router.get("/petugas/datalaporan", petugasControllers.datalaporan);
router.get("/petugas/datalaporan/bukalaporan/:pengaduanUID", petugasControllers.bukalaporan);
router.post("/petugas/konfirmasilaporan", petugasControllers.konfirmasiLaporan);
router.post("/petugas/tanggapilaporan", petugasControllers.tanggapiLaporan);

router.get("/petugas/laporandiproses", petugasControllers.laporandiproses);
router.get("/petugas/laporandiproses/rincianproses/:pengaduanUID", petugasControllers.rincianproses);

router.get("/petugas/laporanditanggapi", petugasControllers.laporanditanggapi);
router.get("/petugas/laporanditanggapi/rincianlaporan/:pengaduanUID", petugasControllers.rincianlaporan);

router.get("/petugas/tentang", petugasControllers.tentang);

router.get("/petugas/signout", petugasControllers.signout);

module.exports = router;