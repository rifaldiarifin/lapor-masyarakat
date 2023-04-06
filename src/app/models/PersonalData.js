const { pool } = require("../../config/database");
const { UIDGenerate } = require("../library/idgenerate");

let personalUID;

const createAccount_MainData = async function(data) {
    personalUID = UIDGenerate();
    const result = await pool.query(`
      INSERT INTO personal_data SET personalUID = '${personalUID}', 
                                    namaPanggilan = '${data['nama_depan']}',
                                    namaLengkap = '${data['nama_depan']} ${data['nama_belakang']}',
                                    username = '${data['username']}', 
                                    password = '${data['password']}', 
                                    email = '${data['email']}', 
                                    tanggalLahir = '${data['tanggal_lahir']}', 
                                    noTelepon = '${data['no_telepon']}', 
                                    fotoProfile = 'empty',
                                    alamat = '${data['alamat']}'
    `);
    return result;
}

const createAccount_LokasiData = async function(data) {
    const result = await pool.query(`
    INSERT INTO personal_lokasi SET personalUID = '${personalUID}', 
                                    provinsi = '${data['provinsi']}',
                                    kota = '${data['kota']}', 
                                    kecamatan = '${data['kecamatan']}', 
                                    kelurahan = '${data['kelurahan']}'
    `);
    return result;
}
const createAccount_LevelData = async function(data) {
    const result = await pool.query(`
      INSERT INTO personal_level SET personalUID = '${personalUID}', 
                                    level = 'masyarakat'
    `);
    return result;
}
const createAccountAsAdmin = async (data) => {
    personalUID = UIDGenerate();
    const result1 = await pool.query(`
    INSERT INTO personal_data SET personalUID = '${personalUID}', 
                                    namaPanggilan = '${data['nama_depan']}',
                                    namaLengkap = '${data['nama_depan']} ${data['nama_belakang']}',
                                    username = '${data['username']}', 
                                    password = '${data['password']}', 
                                    email = '${data['email']}', 
                                    tanggalLahir = '${data['tanggal_lahir']}', 
                                    noTelepon = '${data['no_telepon']}', 
                                    fotoProfile = 'empty',
                                    alamat = '${data['alamat']}'
    `);

    const result2 = await pool.query(`
    INSERT INTO personal_lokasi SET personalUID = '${personalUID}', 
                                    provinsi = '${data['provinsi']}',
                                    kota = '${data['kota']}', 
                                    kecamatan = '${data['kecamatan']}', 
                                    kelurahan = '${data['kelurahan']}'
    `);

    const result3 = await pool.query(`
      INSERT INTO personal_level SET personalUID = '${personalUID}', 
                                    level = '${data['level'].toLowerCase()}'
    `);

    if(data['level'].toLowerCase() !== 'masyarakat'){
        const result4 = await pool.query(`
        INSERT INTO masyarakat_data SET personalUID = '${personalUID}', 
                                        nik = '${data['nik']}'
        `);
    }
    return [result1, result2, result3];
}
const editAccountAsAdmin = async (data) => {
    const result1 = await pool.query(`
    UPDATE personal_data SET  
                                    namaLengkap = '${data['nama_lengkap']}',
                                    username = '${data['username']}', 
                                    password = '${data['password']}', 
                                    email = '${data['email']}', 
                                    tanggalLahir = '${data['tanggal_lahir']}', 
                                    noTelepon = '${data['no_telepon']}', 
                                    fotoProfile = 'empty',
                                    alamat = '${data['alamat']}' WHERE personalUID = '${data['personalUID']}'
    `);
    const result2 = await pool.query(`
    UPDATE personal_lokasi SET  
                                    provinsi = '${data['provinsi']}',
                                    kota = '${data['kota']}', 
                                    kecamatan = '${data['kecamatan']}', 
                                    kelurahan = '${data['kelurahan']}' WHERE personalUID = '${data['personalUID']}'
    `);
    return [result1, result2];
}
const createAccount_masyarakatData = async function(data) {
    const result = await pool.query(`
      INSERT INTO masyarakat_data SET  
                                    personalUID = '${personalUID}',
                                    nik = '${data['nik']}'
    `);
    return result;
}

const validateSignIn = async (user, pass) => {
    const checkUsername = await pool.query(`
        SELECT username FROM personal_data WHERE username = '${user}' LIMIT 1;
    `);
    const checkPassword = await pool.query(`
        SELECT password FROM personal_data WHERE password = '${pass}' LIMIT 1;
    `);
    const checkAll = await pool.query(`
        SELECT * FROM personal_data WHERE username = '${user}' AND password = '${pass}' LIMIT 1;
    `);

    if(!checkUsername[0].length){
        return "1";
    } else if(!checkPassword[0].length){
        return "2";
    } else if(!checkAll[0].length){
        return "3";
    } else {
        return checkAll[0][0];
    }
}

const dataMasyarakat = async (id) => {
    const getNIK = await pool.query(`
        SELECT nik FROM masyarakat_data WHERE personalUID = '${id.personalUID}' LIMIT 1;
    `);
    
    return getNIK[0];
}

const getPersonalDataByUID = async (data) => {
    const getData1 = await pool.query(`
        SELECT * FROM personal_data WHERE personalUID = '${data}' LIMIT 1;
    `);
    const getData2 = await pool.query(`
        SELECT level FROM personal_level WHERE personalUID = '${data}';
    `);
    const getData3 = await pool.query(`
        SELECT provinsi, kota, kecamatan, kelurahan FROM personal_lokasi WHERE personalUID = '${data}';
    `);
    if(getData2[0][0].level.toLowerCase() == 'masyarakat'){
        const getData4 = await pool.query(`
            SELECT nik FROM masyarakat_data WHERE personalUID = '${data}';
        `);
        return [getData1[0][0], getData2[0][0], getData3[0][0], getData4[0][0]];
    }
    return [getData1[0][0], getData2[0][0], getData3[0][0]];
}

const deleteAccount = (personalUID) => {
    const delete1 = pool.query(`
        DELETE FROM personal_data WHERE personalUID = '${personalUID}';
    `);
    const result2 = pool.query(`
        DELETE FROM personal_lokasi WHERE personalUID = '${personalUID}';
    `);
    const result3 = pool.query(`
        DELETE FROM personal_level WHERE personalUID = '${personalUID}';
    `);
    const result4 = pool.query(`
        DELETE FROM masyarakat_data WHERE personalUID = '${personalUID}';
    `);
    return;
}

const getAllPeronalData = async () => {
    const getAllData = await pool.query(`
        SELECT * FROM personal_data;
    `);
    return getAllData[0];
}

const authorizationSignin = async (resultValidate) => {
    const getPositionAccuont = await pool.query(`
        SELECT level FROM personal_level WHERE personalUID = '${resultValidate.personalUID}' LIMIT 1;
    `);
    if(!getPositionAccuont[0].length){
        return false;
    }
    return getPositionAccuont[0][0];
}


module.exports = {
    createAccount_MainData,
    createAccount_LokasiData,
    createAccount_LevelData,
    createAccountAsAdmin,
    getPersonalDataByUID,
    deleteAccount,
    editAccountAsAdmin,
    getAllPeronalData,
    createAccount_masyarakatData,
    validateSignIn,
    authorizationSignin,
    dataMasyarakat,
}