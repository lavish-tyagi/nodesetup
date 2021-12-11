const { sequelize, Sequelize } = require("../../database/connection");

const Sample = sequelize.define(
    "sample",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER
        }
    },
    {
        tableName: "sample",
        createdAt: false,
        updatedAt: false
    }
);
module.exports = { Sample };