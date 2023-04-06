"use strict"

const { 
    createLaporan, 
    createStatusLaporan, 
    getLaporanByPengaduanUID, 
    editLaporanByPengaduanUID , 
    getAllLaporanPengaduan, 
    deleteReport, 
    getLaporanByProses, 
    getLaporanBySelesai,

    getAllLaporanBySession,
    getAllProsesLaporanBySession,
    getAllLaporanSelesaiBySession,

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
        // accountsession: {
        //     pesonalUID: "l1lh23o12398sda9",
        //     namaPanggilan: "Rifaldi",
        //     namaLengkap: "Rifaldi Arifin",
        //     username: "rifaldi7",
        //     password: "rifaldi123",
        //     email: "rifaldiarifin7@gmail.com",
        //     tanggalLahir: "30 - 01 - 2005",
        //     fotoProfile: "empty",
        //     alamat: "Jl M.Yunus Sarang Gagak",
        // }
    }
    res.render("masyarakat/index", {
        // title page
        title: "Lapor Masyarakat | Home",
        baseurl: dataSession.baseURL,
        theme : dataSession.theme,
        containerSPA : dataSession.containerSPA,
        accountsession : dataSession.accountsession,
    });
}

// beranda
const beranda = (req, res) => {
    res.render("masyarakat/beranda", {
        
    });
}

// info personal
const infopersonal = async (req, res) => {

    const dataSession = {
        // theme : light mode : "" OR dark mode : "dark"
        theme: "",
    
        // container spa
        containerSPA: "container-spa2",
        
        // baseurl
        baseURL: process.env.BASE_URL,
        
        // signin session of account
        accountsession: req.session.user
        // accountsession: {
        //     pesonalUID: "l1lh23o12398sda9",
        //     namaPanggilan: "Rifaldi",
        //     namaLengkap: "Rifaldi Arifin",
        //     username: "rifaldi7",
        //     password: "rifaldi123",
        //     email: "rifaldiarifin7@gmail.com",
        //     tanggalLahir: "30 - 01 - 2005",
        //     fotoProfile: "empty",
        //     alamat: "Jl M.Yunus Sarang Gagak",
        // }
    }
    await res.render("masyarakat/infopersonal", {
        // title page
        title: "Lapor Masyarakat | Home",
        baseurl: dataSession.baseURL,
        theme : dataSession.theme,
        containerSPA : dataSession.containerSPA,
        accountsession : dataSession.accountsession,
        nik: req.session.nik,
    });
}

// laporan pengaduan
const laporanPengaduan = async (req, res) => {
    const result = await getAllLaporanBySession(req.session.nik);
    await res.render("masyarakat/laporanpengaduan", {
        datalaporan: result,
    });
}
const buatlaporan = (req, res) => {
    res.render("masyarakat/buatlaporan", {
        
    });
}
const hapuslaporan = async (req, res) => {
    const data = req.body.pengaduanUID;
    await deleteReport(data);
    res.status(200).send("report successfull deleted!");
}
const editlaporan = async (req, res) => {
    console.log(req.session);
    const data = await getLaporanByPengaduanUID(req.params.pengaduanUID);
    await res.render("masyarakat/editlaporan", {
        rincian: data[0],
    });
}
const submitEditLaporan = async (req, res) =>{
    await editLaporanByPengaduanUID(req.body);
    res.status(201).send("successfully edited!");
}
const submitlaporan = async (req, res) => {
    
    let sampleFile;
    let uploadPath;
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.laporanfile;
    let pathfolder = "picture";
    if(sampleFile.mimetype == 'video/mp4' || sampleFile.mimetype == 'video/x-matroska'){
        pathfolder = "video";
    }

    const imgGenerate = `img${new Date().getFullYear()}${new Date().getMonth()}${new Date().getMinutes()}${new Date().getMilliseconds()}`;
    let newpathfile = sampleFile.name.split(".");
    newpathfile = newpathfile[newpathfile.length - 1];
    uploadPath = __dirname + '/../../../../public/filelaporan/' + pathfolder + '/' + imgGenerate + "." + newpathfile;
    const data = {
        namaPelapor: req.session.user.namaLengkap,
        fotoProfile: req.session.user.fotoProfile,
        nikMelaporkan: req.session.nik,
        judul: req.body.judul,
        keterangan: req.body.keterangan,
        waktu: req.body.waktu,
        tanggal: req.body.tanggal,
        filelaporan: imgGenerate + "." + newpathfile,
    }

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, async function(err) {
        if (err)
        return res.status(500).send(err);

        // res.send('File uploaded!');
        await createLaporan(data);
        await createStatusLaporan();
        // res.status(200).send("ok");
        res.redirect("/home");
    });

}
const rincianlaporan = async (req, res) => {
    const data = await getLaporanByPengaduanUID(req.params.pengaduanUID);
    await res.render("masyarakat/rincianlaporan", {
        rincian: data[0],
    });
}

// tanggapan pengaduan
const tanggapanPengaduan = async (req, res) => {
    // const proses await getLaporanByProses();
    const selesai = await getLaporanBySelesai();
    res.render("masyarakat/tanggapanpengaduan", {
        laporanSelesai: selesai
    });
}
const rinciantanggapan = (req, res) => {
    res.render("masyarakat/rinciantanggapan", {
        
    });
}

// tentang
const tentang = (req, res) => {
    res.render("masyarakat/tentang", {
        
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
    laporanPengaduan,
    editlaporan,
    buatlaporan,
    submitEditLaporan,
    submitlaporan,
    rincianlaporan,
    tanggapanPengaduan,
    rinciantanggapan,
    hapuslaporan,
    tentang,
    signout,
}