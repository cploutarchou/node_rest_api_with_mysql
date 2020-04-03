/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 03/04/2020
 * Time: 23:33
 **/
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
// function to drop existing tables and re-sync database

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dropRestApiTable = () => {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("rest-api-tutorial table just dropped and db re-synced.");
  });
};
db.tutorials = require("./Sequelize.model")(sequelize, Sequelize);
module.exports = db;
