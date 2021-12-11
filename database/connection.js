var mysql = require('mysql');
const config = require("../config");
require("dotenv").config();
const Sequelize = require("sequelize");

// create connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env?.DB_HOST || "localhost",
    dialect: 'mysql'
});

module.exports = {sequelize, Sequelize};