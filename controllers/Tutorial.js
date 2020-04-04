/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and save new Tutorial
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content cannot be empty"
    });
  }
  // Create a Tutorial object
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  // Save Tutorial object to db
  Tutorial.create(tutorial).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Tutorial
exports.getAll = (req, res) => {

};
// Get Tutorial by ID
exports.getByID = (req, res) => {

};
// Update Tutorial by ID
exports.update = (req, res) => {

};
// Delete Tutorial by ID
exports.delete = (req, res) => {

};
// Delete All Tutorial
exports.deleteAll = (req, res) => {

};

// Get all published Tutoria

exports.getAllPublished = (res, req) => {

};
