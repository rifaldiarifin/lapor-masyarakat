"use strict"

const {
    getAllLaporanPengaduan,
    getLaporanByPengaduanUID,
    setkonfirmasiLaporan,
    getPendingLaporanPengaduan,
    getProsesLaporanPengaduan,
    getSelesaiLaporanPengaduan,
    getTanggapanDataByPengaduanUID,
    tanggapiLaporanByPengaduanUID,
} = require("../../models/Laporan"); 

const mainSPA = (req, res) => {
    const dataSession = {
        // theme : light mode : "" OR dark mode : "dark"
        theme: "",
    
        // container spa
        containerSPA: "container-spa2",
    
        // baseurl
        baseURL: process.env.BASE_URL,
    
        // signin session of account
        accountsession: req.session.user
    }
    res.render("petugas/index", {
        // title page
        title: "Lapor Masyarakat | AS Petugas",
        theme : dataSession.theme,
        baseurl: dataSession.baseURL,
        containerSPA : dataSession.containerSPA,
        accountsession : dataSession.accountsession,
    });
}

// beranda
const beranda = (req, res) => {
    res.render("petugas/beranda", {
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}

// info personal
const infopersonal = async (req, res) => {
    const result = await getAllLaporanPengaduan();
    res.render("petugas/infopersonal", {
        datalaporan: result,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}

// datalaporan
const datalaporan = async (req, res) => {
    const data = await getPendingLaporanPengaduan();
    await res.render("petugas/datalaporan", {
        datalaporan: data,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}
const konfirmasiLaporan = async (req, res) => {
    const data = await setkonfirmasiLaporan(req.body);
    res.send("Has been Confirmed!");
}

const bukalaporan = async (req, res) => {
    const data = req.params.pengaduanUID;
    const laporan = await getLaporanByPengaduanUID(data);
    res.render("petugas/bukalaporan", {
        laporan : laporan[0],
        nik : laporan[0].nik,
        nama : laporan[0].namaPelapor,
        fotoProfile : laporan[0].fotoPelapor,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}

// laporan diproses
const laporandiproses = async (req, res) => {
    const data = await getProsesLaporanPengaduan();
    console.log(data);
    await res.render("petugas/laporandiproses", {
        datalaporan: data,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}
const rincianproses = async (req, res) => {
    const data = req.params.pengaduanUID;
    const laporan = await getLaporanByPengaduanUID(data);
    res.render("petugas/rincianproses", {
        laporan : laporan[0],
        nik : laporan[0].nik,
        nama : laporan[0].namaPelapor,
        fotoProfile : laporan[0].fotoPelapor,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}

const tanggapiLaporan = async (req, res) => {
    const dataTanggapan = {
        userpetugas: req.session.user,
        pengaduanUID: req.body.pengaduanUID,
        tanggapan: req.body.tanggapan,
        verify: req.body.verify,
    }
    await tanggapiLaporanByPengaduanUID(dataTanggapan);
    res.send("succesfully responded!");
}

// laporanditanggapi
const laporanditanggapi = async (req, res) => {
    const data = await getSelesaiLaporanPengaduan();
    console.log(data[0]);
    await res.render("petugas/laporanditanggapi", {
        datalaporan: data,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}
const rincianlaporan = async (req, res) => {
    const data = await getLaporanByPengaduanUID(req.params.pengaduanUID);
    const data2 = await getTanggapanDataByPengaduanUID(req.params.pengaduanUID);
    console.log(data2)
    res.render("petugas/rincianlaporan", {
        rincian: data[0],
        tanggapanData: data2,
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}

// tentang
const tentang = (req, res) => {
    res.render("petugas/tentang", {
        accountsession : req.session.user,
        baseurl: process.env.BASE_URL,
    });
}

const signout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          return console.log(err);
        }
        res.redirect("/");
        console.log("logged out");
      });
}

module.exports = {
    mainSPA,
    beranda,
    infopersonal,
    datalaporan,
    bukalaporan,
    laporandiproses,
    tanggapiLaporan,
    rincianproses,
    laporanditanggapi,
    konfirmasiLaporan,
    signout,
    rincianlaporan,
    tentang,
}