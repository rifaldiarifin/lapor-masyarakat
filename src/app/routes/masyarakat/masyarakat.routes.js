"use strict"

const express = require("express");
const masyarakatControllers = require("../../controllers/masyarakat/masyarakat.controller");

const router = express.Router();

router.get("/home", masyarakatControllers.mainSPA);

router.get("/home/beranda", masyarakatControllers.beranda);

router.get("/home/infopersonal", masyarakatControllers.infopersonal);

router.get("/home/laporanpengaduan", masyarakatControllers.laporanPengaduan);

router.get("/home/laporanpengaduan/editlaporan/:pengaduanUID", masyarakatControllers.editlaporan);

router.post("/home/laporanpengaduan/editlaporan/submiteditlaporan", masyarakatControllers.submitEditLaporan);

router.post("/home/laporanpengaduan/hapuslaporan", masyarakatControllers.hapuslaporan);

router.get("/home/laporanpengaduan/buatlaporan", masyarakatControllers.buatlaporan);

router.post("/home/laporanpengaduan/buatlaporan", masyarakatControllers.submitlaporan);

router.get("/home/laporanpengaduan/rincianlaporan/:pengaduanUID", masyarakatControllers.rincianlaporan);

router.get("/home/tanggapanpengaduan", masyarakatControllers.tanggapanPengaduan);

router.get("/home/tanggapanpengaduan/rinciantanggapan", masyarakatControllers.rinciantanggapan);

router.get("/home/tentang", masyarakatControllers.tentang);

router.get("/home/signout", masyarakatControllers.signout);

module.exports = router;