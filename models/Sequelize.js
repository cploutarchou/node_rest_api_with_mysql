/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 03/04/2020
 * Time: 23:33
 **/
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelizeConfig = {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
};
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { sequelizeConfig }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorial = require("models/Tutorial")(sequelize, Sequelize);

module.exports = db;
