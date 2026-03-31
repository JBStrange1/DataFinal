const express = require ('express')
const mysql = require('mysql')

const app = expresss()
const connection = mysql.createConnection({
    host: 'localhost',
    userInfo: 'dbuser',
    password: 'School123',
    database: 'project_db'
});

connection.connect()
