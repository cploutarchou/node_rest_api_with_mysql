/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : app.js
 * Date: 03/04/2020
 * Time: 12:22
 **/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");
const tutorial = require("./controllers/Tutorial");
const corsSettings = {
  originL: "http://localhost:8081"
};

server.use(cors(corsSettings));
// Parse request of content-type - application/json
server.use(bodyParser.json());
// parse requests of content-type -application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// create a simple route
server.get("/", (_req, res) => {
  res.json({ message: "Welcome to node.js rest api application. Created for learning purposes by Christos Ploutarchou" });
});
server.use("/", tutorial.getByID);
// set listening ports for request
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
// Run following function if you want drop existing tables and re-sync database
// db.dropRestApiTable();
db.databaseConf.sync();
