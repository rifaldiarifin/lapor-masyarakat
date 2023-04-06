"use strict"

const express = require("express");
const adminControllers = require("../../controllers/admin/admin.controller");
const router = express.Router();

router.get("/admin", adminControllers.mainSPA);
router.get("/admin/beranda", adminControllers.beranda);
router.get("/admin/infopersonal", adminControllers.infopersonal);

router.get("/admin/datapersonal", adminControllers.datapersonal);
router.get("/admin/datapersonal/rincianpersonal/:personalUID", adminControllers.rincianpersonal);
router.get("/admin/datapersonal/tambahakun", adminControllers.tambahakun);
router.get("/admin/datapersonal/editakun/:personalUID", adminControllers.editakun);
router.post("/admin/datapersonal/editakun/editaccount", adminControllers.editaccount);
router.post("/admin/datapersonal/tambahakun/createaccount", adminControllers.createaccount);
router.post("/admin/datapersonal/hapusakun", adminControllers.hapusakun);

router.get("/admin/datalaporan", adminControllers.datalaporan);
router.get("/admin/datalaporan/bukalaporan", adminControllers.bukalaporan);

router.get("/admin/laporandiproses", adminControllers.laporandiproses);
router.get("/admin/laporandiproses/rincianproses", adminControllers.rincianproses);

router.get("/admin/laporanditanggapi", adminControllers.laporanditanggapi);
router.get("/admin/laporanditanggapi/rincianlaporan", adminControllers.rincianlaporan);

router.get("/admin/tentang", adminControllers.tentang);

router.get("/admin/signout", adminControllers.signout);

module.exports = router;