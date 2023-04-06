"use strict"

const {
    getAllLaporanPengaduan,
    getSelesaiLaporanPengaduan,
    getProsesLaporanPengaduan,
    getPendingLaporanPengaduan,
    getLaporanByPengaduanUID,
} = require('../../models/Laporan');

const {
    getAllPeronalData,
    createAccountAsAdmin,
    editAccountAsAdmin,
    deleteAccount,
    getPersonalDataByUID,
} = require('../../models/PersonalData');

const mainSPA = async (req, res) => {
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
    await res.render("admin/index", {
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
    res.render("admin/beranda", {
        accountsession : req.session.user,
    });
}

// info personal
const infopersonal = (req, res) => {
    res.render("admin/infopersonal", {
        accountsession : req.session.user,
    });
}

// data personal
const datapersonal = async (req, res) => {
    const users = await getAllPeronalData();
    await res.status(200).render("admin/datapersonal", {
        users : users,
        accountsession : req.session.user,
    });
}
const rincianpersonal = async (req, res) => {
    const data = req.params.personalUID;
    const userData = await getPersonalDataByUID(data);
    console.log(userData);
    await res.status(200).render("admin/rincianpersonal", {
        // users : users,
        personalData : userData[0],
        personalLevel : userData[1],
        personalLokasi : userData[2],
        personalNIK : userData[3],
        accountsession : req.session.user,
    });
}
const tambahakun = (req, res) => {
    res.render("admin/tambahakun", {
        accountsession : req.session.user,
    });
}
const createaccount = async (req, res) => {
    const data = req.body;
    await createAccountAsAdmin(data);
    await res.send("account successfully created!")
}
const editakun = async (req, res) => {
    const data = req.params.personalUID;
    const userData = await getPersonalDataByUID(data);
    await res.render("admin/editakun", {
        personalData : userData[0],
        personalLevel : userData[1],
        personalLokasi : userData[2],
        personalNIK : userData[3],
    });
}
const editaccount = async (req, res) => {
    const data = req.body;
    await editAccountAsAdmin(data);
    res.send("account successfully edited!");
}
const hapusakun = async (req, res) => {
    const data = req.body.keyAccount;
    await deleteAccount(data);
    res.status(200).send("report successfull deleted!");
}

// data laporan
const datalaporan = async (req, res) => {
    const data = await getPendingLaporanPengaduan();
    await res.render("admin/datalaporan", {
        datalaporan : data,
        accountsession : req.session.user,
    });
}
const bukalaporan = (req, res) => {
    res.render("admin/bukalaporan", {
        accountsession : req.session.user,
    });
}

// laporan diproses
const laporandiproses = async (req, res) => {
    const data = await getProsesLaporanPengaduan();
    await res.render("admin/laporandiproses", {
        datalaporan : data,
        accountsession : req.session.user,
    });
}
const rincianproses = (req, res) => {
    res.render("admin/rincianproses", {
        accountsession : req.session.user,
    });
}

// laporanditanggapi
const laporanditanggapi = async (req, res) => {
    const data = await getSelesaiLaporanPengaduan();
    await res.render("admin/laporanditanggapi", {
        datalaporan : data,
        accountsession : req.session.user,
    });
}
const rincianlaporan = (req, res) => {
    res.render("admin/rincianlaporan", {
        accountsession : req.session.user,
    });
}

// tentang
const tentang = (req, res) => {
    res.render("admin/tentang", {
        accountsession : req.session.user,
    });
}

// signout
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
    datapersonal,
    tambahakun,
    hapusakun,
    datalaporan,
    bukalaporan,
    editakun,
    editaccount,
    laporandiproses,
    rincianpersonal,
    rincianproses,
    laporanditanggapi,
    createaccount,
    rincianlaporan,
    signout,
    tentang,
}