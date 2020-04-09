/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Sequelize.js
 * Date: 04/04/2020
 * Time: 22:08
 **/

const db = require("../models");
const postObj = db.posts;
const Op = db.Sequelize.Op;

// Create and save new Post
exports.create = (request, result) => {
  if (!request.body.title) {
    result.status(400).send({
      message: "Content cannot be empty"
    });
  }

  // Create a Post object
  const post = {
    title: request.body.title,
    description: request.body.description,
    published: request.body.published ? request.body.published : false,
    publisher: request.body.publisher ? request.body.publisher : false
  };

  // Save Post object to db
  postObj.create(post).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Some error occurred while saving."
    });
  });
};

// Retrieve all Post (Receive data with condition).
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

// Get Post object by ID
exports.getPostByID = (request, result) => {
  const paramID = request.params.id;
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
// Update a Post object by the id
exports.updatePostByID = (request, result) => {
  const paramID = request.params.id;
  console.log(paramID);
  console.log(request.body);
  postObj.update(request.body, {
    where: { id: paramID }
  }).then(num => {
    console.log(num[0]);
    if (num[0] === 1) {
      result.send({
        message: "Post object successfully updated."
      });
    } else {
      result.send({
        message: `Cannot update Post object with id=${paramID}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Error while updating Post object with id=${paramID}!`
    });
  });
};

// Delete Post object by ID
exports.deletePostByID = (request, result) => {
  const id = request.params.id;
  postObj.destroy({
    where: { id: id }
  }).then(num => {
    if (num === 1) {
      result.send({
        message: "Post object successfully deleted."
      });
    } else {
      result.send({
        message: `Cannot delete Post object with id=${id}!`
      });
    }
  }).catch(err => {
    result.status(500).send({
      message: err.message || `Cannot delete Post object with id=${id}!`
    });
  });
};

// Delete All Posts objects from database
exports.deleteAllPosts = (request, result) => {
  postObj.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    result.send({
      message: `${nums} Post objects was deleted successfully!`
    });
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Cannot delete Post objects. Something going wrong}!"
    });
  });
};

// Get all published Post
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

// Get all published Post by Publisher Name
exports.getAllPostsByPublisherName = (request, result) => {
  const name = request.params.name;
  const condition = name ? { publisher: { [Op.like]: `%${name}%` } } : null;
  postObj.findAll({ where: condition }).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};
// Get all published post by Title
exports.getPostByTitle = (request, result) => {
  const paramTitle = request.query.title;
  const condition = paramTitle ? { title: { [Op.like]: `%${paramTitle}%` } } : null;
  console.log(condition);
  postObj.findAll({ where: condition }
  ).then(data => {
    result.send(data);
  }).catch(err => {
    result.status(500).send({
      message: err.message || "Something going wrong. Unable to retrieve data!"
    });
  });
};
