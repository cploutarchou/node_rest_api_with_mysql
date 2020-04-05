/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const tutorialObj = db.tutorial;
const Op = db.Sequelize.Op;

// Create and save new Tutorial
exports.create = (request, result) => {
  if (!request.body.title) {
    result.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Create a Tutorial object
  const tutorial = {
    title: request.body.title,
    description: request.body.description,
    published: request.body.published ? request.body.published : false,
    publisher: request.body.publisher ? request.body.publisher : false
  };

  // Save Tutorial object to db
  tutorialObj.create(tutorial).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Tutorial (Receive data with condition).
exports.getAll = (request, result) => {
  tutorialObj.findAll()
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
};

// Get Tutorial object by ID
exports.getByID = (request, result) => {
  const paramID = request.params.id;
  console.log(paramID);
  console.log(paramID);
  tutorialObj.findAll({
    where: { id: paramID }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Some error occurred while retrieving data with id : ${paramID}`
    });
  });
};
// Update a Tutorial object by the id
exports.updateByID = (request, result) => {
  const id = request.params.id;
  tutorialObj.update(request.body, {
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "Tutorial object successfully updated."
      });
    } else {
      result.send({
        message: `Cannot update Tutorial object with id=${id}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Error while updating Tutorial object with id=${id}!`
    });
  });
};

// Delete Tutorial object by ID
exports.deleteByID = (request, result) => {
  const id = request.params.id;
  tutorialObj.destroy({
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "Tutorial object successfully deleted."
      });
    } else {
      result.send({
        message: `Cannot delete Tutorial object with id=${id}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Cannot delete Tutorial object with id=${id}!`
    });
  });
};

// Delete All Tutorials objects from database
exports.deleteAll = (request, result) => {
  tutorialObj.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    result.send({
      message: `${nums} Tutorial objects was deleted successfully!`
    });
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Cannot delete Tutorials objects. Something going wrong}!"
    });
  });
};

// Get all published Tutorial
exports.getAllPublished = (request, result) => {
  tutorialObj.findAll({
    where: { published: true }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};

// Get all published Tutorial by Publisher Name
exports.getAllByPublisherName = (request, result) => {
  const publisher = request.params.publisher;
  tutorialObj.findAll({
    where: { publisher: { [Op.like]: `%${publisher}%` } }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};
