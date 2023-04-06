const { pool } = require("../../config/database");
const { UIDGenerate } = require("../library/idgenerate");

let personalUID;

const months = ["January", "February", "Maret", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    numMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    shortWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const createLaporan = async (data) => {
    personalUID = UIDGenerate();
    const tanggal = new Date();
    const jam = tanggal.getHours();
    const minute = tanggal.getMinutes();
    if(jam.length == 1){
        jam = "0" + tanggal.getHours();
    }
    if(minute.length == 1){
        minute = "0" + tanggal.getMinutes();
    }
    const result = await pool.query(`
        INSERT INTO pengaduan_data SET pengaduanUID = 'report${personalUID}', namaPelapor = '${data.namaPelapor}', fotoPelapor = '${data.fotoProfile}', nikMelaporkan = '${data.nikMelaporkan}', judul = '${data.judul}', keterangan = '${data.keterangan}', tanggalPengaduan = '${data.tanggal}', waktuPengaduan = '${jam}:${minute} WIB', fileupload = '${data.filelaporan}'
    `);
}

const editLaporanByPengaduanUID = async (data) => {
    await pool.query(`
        UPDATE pengaduan_data SET judul = '${data.judul}', keterangan = '${data.keterangan}' WHERE pengaduanUID = '${data.pengaduanUID}'
    `);
    return;
}

const tanggapiLaporanByPengaduanUID = async (data) => {
    const date = new Date();
    const result = await pool.query(`
        INSERT tanggapan_data SET pengaduanUID = '${data.pengaduanUID}', namaPetugas = '${data.userpetugas.namaLengkap}', fotoPetugas = '${data.userpetugas.fotoProfile}', tanggapan = '${data.tanggapan}', waktu = '${date.getHours()}:${date.getMinutes()} WIB', tanggal = '${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}', verifikasi = '${parseInt(data.verify)}'
    `);
    const setStatus = await pool.query(`
        UPDATE pengaduan_status SET status = 'selesai' WHERE pengaduanUID = '${data.pengaduanUID}'
    `);
}

const setkonfirmasiLaporan = async (data) => {
    const result = await pool.query(`
        UPDATE pengaduan_status SET status = 'proses' WHERE pengaduanUID = '${data.konfirmasiUID}'
    `);
}

const createStatusLaporan = async () => {
    const result = await pool.query(`
        INSERT INTO pengaduan_status SET pengaduanUID = 'report${personalUID}', status = 'pending'
    `);
}

const getLaporanBySelesai = async () => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'selesai');
    `);
    return result[0];
}
const getLaporanByProses = async () => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'proses');
    `);
    return result[0];
}

const getAllLaporanPengaduan = async () => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data;
    `);
    
    return result[0];
}


const getAllLaporanBySession = async (nik) => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE nikMelaporkan = '${nik}';
    `);
    
    return result[0];
}
const getAllProsesLaporanBySession = async (nik) => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE nikMelaporkan = '${nik}' AND pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'proses');
    `);
    
    return result[0];
}
const getAllLaporanSelesaiBySession = async (nik) => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE nikMelaporkan = '${nik}' AND pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'selesai');
    `);
    
    return result[0];
}


const getPendingLaporanPengaduan = async () => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'pending');
    `);
    
    return result[0];
}
const getProsesLaporanPengaduan = async () => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'proses');
    `);
    
    return result[0];
}
const getSelesaiLaporanPengaduan = async () => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE pengaduanUID IN (SELECT pengaduanUID FROM pengaduan_status WHERE status = 'selesai');
    `);
    
    return result[0];
}
const deleteReport = async (pengaduanUID) => {
    const result = await pool.query(`
        DELETE FROM pengaduan_data WHERE pengaduanUID = '${pengaduanUID}'
    `);
}

const getLaporanByPengaduanUID = async (data) => {
    const result = await pool.query(`
        SELECT * FROM pengaduan_data WHERE pengaduanUID = '${data}' LIMIT 1
    `);
    const result2 = await pool.query(`
        SELECT nik FROM masyarakat_data WHERE nik = '${result[0][0].nikMelaporkan}' LIMIT 1
    `);
    if(result2[0].length == 0){
        return [result[0][0], false];
    }
    return [result[0][0], true];
}

const getTanggapanDataByPengaduanUID = async (pengaduanUID) => {
    const result = await pool.query(`
        SELECT * FROM tanggapan_data WHERE pengaduanUID = '${pengaduanUID}'
    `);
    return result[0][0];
}

module.exports = {
    createLaporan,
    createStatusLaporan,
    tanggapiLaporanByPengaduanUID,
    getAllLaporanPengaduan,
    getLaporanBySelesai,
    getPendingLaporanPengaduan,
    getProsesLaporanPengaduan,
    getSelesaiLaporanPengaduan,
    getTanggapanDataByPengaduanUID,

    getAllLaporanBySession,
    getAllProsesLaporanBySession,
    getAllLaporanSelesaiBySession,

    getLaporanByProses,
    setkonfirmasiLaporan,
    editLaporanByPengaduanUID,
    getLaporanByPengaduanUID,
    deleteReport,
}