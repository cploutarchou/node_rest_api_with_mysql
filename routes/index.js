/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/

const tutorial = require("../controllers/Post");
const express = require("express");
const router = express.Router();
// Create New Tutorial
router.post("/api/posts/create", tutorial.create);
// // Retrieve all Tutorials
router.get("/api/posts/all", tutorial.getAllPosts);
// Retrieve all Published Tutorials
router.get("/api/posts/published", tutorial.getAllPublishedPosts);
// Retrieve all Published Tutorials by Publisher Name
router.get("/api/posts", tutorial.getAllPostsByPublisherName);
// Retrieve all posts by title
router.get("/api/posts", tutorial.getPostByTitle);
// Retrieve Tutorial by ID
router.get("/api/posts/:id", tutorial.getPostByID);
// // Update Tutorial by ID
router.put("/api/post/update/:id", tutorial.updatePostByID);
// // Delete Tutorial by ID
router.get("/api/post/delete/:id", tutorial.deletePostByID);
// Delete all Tutorials
router.get("/api/posts/deleteAll", tutorial.deleteAllPosts);

module.exports = router;
