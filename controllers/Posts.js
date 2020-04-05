/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const postObj = db.tutorial;
const Op = db.Sequelize.Op;

// Create and save new Tutorial
exports.create = (request, result) => {
  if (!request.body.title) {
    result.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Create a Tutorial object
  const post = {
    title: request.body.title,
    description: request.body.description,
    published: request.body.published ? request.body.published : false,
    publisher: request.body.publisher ? request.body.publisher : false
  };

  // Save Tutorial object to db
  postObj.create(post).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Tutorial (Receive data with condition).
exports.getAllPosts = (request, result) => {
  postObj.findAll()
    .then(data => {
      result.send(data);
    }).catch(err => {
      result.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
};

// Get Tutorial object by ID
exports.getPostByID = (request, result) => {
  const paramID = request.params.id;
  console.log(paramID);
  console.log(paramID);
  postObj.findAll({
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
exports.updatePostByID = (request, result) => {
  const id = request.params.id;
  postObj.update(request.body, {
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
exports.deletePostByID = (request, result) => {
  const id = request.params.id;
  postObj.destroy({
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
exports.deleteAllPosts = (request, result) => {
  postObj.destroy({
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
exports.getAllPublishedPosts = (request, result) => {
  postObj.findAll({
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
exports.getAllPostsByPublisherName = (request, result) => {
  const publisher = request.params.publisher;
  postObj.findAll({
    where: { publisher: { [Op.like]: `%${publisher}%` } }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};
// Get all published post by Title
exports.getPostByTitle = (request, result) => {
  const title = request.query.title;
  postObj.findAll({
    where: {
      publisher: { [Op.like]: `%${title}%` },
      published: true
    }
  }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};
