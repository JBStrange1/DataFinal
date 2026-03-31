var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const dbconfig = require("../DB/dbconfig");

router.get("/", function (req, res) {
   const dbconfig = require("../DB/dbconfig")
    connection.connect(err => {
        if(err) throw err;
        console.log("Connected")
    })
})