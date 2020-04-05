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
    published: req.body.published ? req.body.published : false,
    publisher: req.body.publisher_name ? req.body.publisher_name : false
  };

  // Save Tutorial object to db
  tutorialObj.create(tutorial).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Tutorial (Receive data with condition).
exports.getAll = (req, res) => {
  tutorialObj.findAll()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
};

// Get Tutorial object by ID
exports.getByID = (req, res) => {
  const paramID = req.params.id;
  console.log(paramID);
  console.log(paramID);
  tutorialObj.findAll({
    where: { id: paramID }
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Some error occurred while retrieving data with id : ${paramID}`
    });
  });
};
// Update a Tutorial object by the id
exports.updateByID = (req, res) => {
  const id = req.params.id;
  tutorialObj.update(req.body, {
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Tutorial object successfully updated."
      });
    } else {
      res.send({
        message: `Cannot update Tutorial object with id=${id}!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Error while updating Tutorial object with id=${id}!`
    });
  });
};

// Delete Tutorial object by ID
exports.deleteByID = (req, res) => {
  const id = req.params.id;
  tutorialObj.destroy({
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Tutorial object successfully deleted."
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial object with id=${id}!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || `Cannot delete Tutorial object with id=${id}!`
    });
  });
};

// Delete All Tutorials objects from database
exports.deleteAll = (req, res) => {
  tutorialObj.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} Tutorial objects was deleted successfully!`
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Cannot delete Tutorials objects. Something going wrong}!"
    });
  });
};

// Get all published Tutorial
exports.getAllPublished = (req, res) => {
  tutorialObj.findAll({
    where: { published: true }
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};

// Get all published Tutorial by Publisher Name
exports.getAllByPublisherName = (res, req) => {
  // eslint-disable-next-line camelcase
  const publisher_name = req.params.publisher_name;
  // eslint-disable-next-line camelcase
  const condition = publisher_name ? { publisher_name: { [Op.like]: `%${publisher_name}%` } } : null;
  tutorialObj.findAll({
    where: { publisher_name: condition }
  }).then(num => {
    if (num === 1) {
      res.send({
        message: "Tutorial object successfully updated."
      });
    } else {
      res.send({
        // eslint-disable-next-line camelcase
        message: `Cannot update Tutorial object with Publisher Name = ${publisher_name}!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      // eslint-disable-next-line camelcase
      message: err.message || `Error while updating Tutorial object with Publisher Name =${publisher_name}!`
    });
  });
};
