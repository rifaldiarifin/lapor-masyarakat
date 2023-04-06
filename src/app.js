"use strict"

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const homeRouter = require("./app/routes/home/home.routes");
const masyarakatRouter = require("./app/routes/masyarakat/masyarakat.routes");
const petugasRouter = require("./app/routes/petugas/petugas.routes");
const adminRouter = require("./app/routes/admin/admin.routes");
const cookieParser = require('cookie-parser');
const fileupload = require("express-fileupload");

app.set("view engine", "ejs");
app.set("views", "./src/app/views");

app.use(express.static("public"));
app.use(express.json());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "lapormasyarakat753753",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 1000 * 24}
}));
app.use(cookieParser());

app.get("/sessionid", (req, res) => {
  res.send(req.session.id);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`
    Starting App ${process.env.APP_NAME} v${process.env.VERSION} ...`);
    setTimeout(() => {
      console.log(`
    Server running at port ${process.env.PORT}
  
    http://localhost:${process.env.PORT}
    `);
  }, 1000);
});

app.use(homeRouter);
app.use(masyarakatRouter);
app.use(petugasRouter);
app.use(adminRouter);

app.use((req, res) => {
  res.status(404).send("Page not found...");
});
