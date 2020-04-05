/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/

const tutorial = require("../controllers/Tutorial");
const express = require("express");
const router = express.Router();

// Create New Tutorial
// router.post("/", tutorial.create);
// // Retrieve all Tutorials
router.get("/api/tutorials", tutorial.getAll);
// Retrieve all Published Tutorials
router.get("/api/published", tutorial.getAllPublished);
// // Retrieve all Published Tutorials by Publisher Name
// router.get("/", tutorial.getAllByPublisherName);
// Retrieve Tutorial by ID
router.get("/api/id/:id", tutorial.getByID);
// // Update Tutorial by ID
// router.put("/", tutorial.updateByID);
// // Delete Tutorial by ID
// router.delete("/", tutorial.deleteByID);
// // Delete all Tutorials
// router.delete("/", tutorial.deleteAll);

module.exports = router;
