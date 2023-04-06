"use strict"

const { createAccount_MainData, createAccount_LokasiData, createAccount_LevelData, createAccount_masyarakatData, validateSignIn, authorizationSignin, dataMasyarakat } = require("../../models/PersonalData");

const dataSessionLanding = {
    // title page
    title: "Lapor Masyarakat | Landing Page",

    // theme : light mode : "" OR dark mode : "dark"
    theme: "",

    // container spa
    containerSPA: "container-spa1",

    // baseurl
    baseurl: process.env.BASE_URL,

    // signin session of account
    accountsession: {
        firstname: "Rifaldi",
        lastname: "Arifin",
        fullname: "Rifaldi Arifin",
        email: "rifaldiarifin7@gmail.com",
        avatar: "avatar1.png",
    }
}

const dataSessionForms = {
    // title page
    title: "Lapor Masyarakat | Sign In",

    // theme : light mode : "" OR dark mode : "dark"
    theme: "",

    // container spa
    containerSPA: "forms-spa",

    // baseurl
    baseurl: process.env.BASE_URL,

    // signin session of account
    accountsession: {
        firstname: "Rifaldi",
        lastname: "Arifin",
        fullname: "Rifaldi Arifin",
        email: "rifaldiarifin7@gmail.com",
        avatar: "avatar1.png",
    }
}

const mainSPA = async (req, res) => {
    await res.render("home/index", {
        // title page
        title: dataSessionLanding.title,
        theme: dataSessionLanding.theme,
        baseurl: dataSessionLanding.baseURL,
        containerSPA: dataSessionLanding.containerSPA,
        accountsession: dataSessionLanding.accountsession,
    });
}
const formsSPA = (req, res) => {
    let message = req.session.signinError || "";
    let user = req.session.user || "";
    req.session.signinError = ""; 
    console.log(user, message);
    res.render("home/forms", {
        title: dataSessionForms.title,
        theme: dataSessionForms.theme,
        user,
        message,
        baseurl: dataSessionForms.baseURL,
        containerSPA: dataSessionForms.containerSPA,
        accountsession: dataSessionForms.accountsession,
    });
}
const signin = async (req, res) => {
    const { username, password } = req.body;
    const result = await validateSignIn(username, password);
    // console.log(result);
    req.session.signinError = "";
    switch (result) {
        case "1":
            req.session.signinError = "Wrong username!"; 
            res.redirect("/forms");
            break;
        case "2":
            req.session.signinError = "Wrong password!"; 
            res.redirect("/forms");
            break;
        case "3":
            req.session.signinError = "Account not found!"; 
            res.redirect("/forms");
            break;
        default:
            req.session.user = result;
            const auth = await authorizationSignin(result);
            if(auth == false){
                res.redirect("/forms")
            }
            switch (auth.level.toLowerCase()) {
                case "masyarakat":
                    const nik = await dataMasyarakat(result);
                    req.session.nik = nik[0].nik;
                    res.redirect("/home");
                    break;
                case "petugas":
                    res.redirect("/petugas");
                    break;
                case "admin":
                    res.redirect("/admin");
                    break;
                default:
                    break;
            }
            break;
    }
}
const backsignin = (req, res) => {
    res.render("home/signin");
}
const signup = (req, res) => {
    res.render("home/signup");
}
const buatakun = async (req, res) => {
    const data = req.body;
    const mainData = await createAccount_MainData(data),
        lokasiData = await createAccount_LokasiData(data),
        levelData = await createAccount_LevelData(data),
        masyarakatData = await createAccount_masyarakatData(data);
    res.status(201).send(mainData, lokasiData, levelData, masyarakatData);
}
const informasipersonal = (req, res) => {
    res.render("home/informasipersonal");
}
const lokasialamat = (req, res) => {
    res.render("home/lokasialamat");
}
const nomortelepon = (req, res) => {
    res.render("home/nomortelepon");
}
const aturprofile = (req, res) => {
    res.render("home/aturprofile");
}
const penyelesaianakhir = (req, res) => {
    res.render("home/penyelesaianakhir", {
        baseurl: dataSessionForms.baseURL,
    });
}
const signupsuccess = (req, res) => {
    res.render("home/signupsuccess");
}

module.exports = {
    mainSPA,
    formsSPA,
    signin,
    backsignin,
    signup,
    buatakun,
    informasipersonal,
    lokasialamat,
    nomortelepon,
    aturprofile,
    penyelesaianakhir,
    signupsuccess,
}