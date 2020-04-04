/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : routes.js
 * Date: 05/04/2020
 * Time: 01:45
 **/
exports.appRoutes = () => {
  const tutorial = require("../controllers/Tutorial");
  const server = require("express");
  const router = server.Router();
  // Create New Tutorial
  router.post("/", tutorial.create);
  // Retrieve all Tutorials
  router.get("/", tutorial.getAll);
  // Retrieve all Published Tutorials
  router.get("/", tutorial.getAllPublished);
  // Retrieve all Published Tutorials by Publisher Name
  router.get("/", tutorial.getAllByPublisherName);
  // Retrieve Tutorial by ID
  router.get("/", tutorial.getByID);
  // Update Tutorial by ID
  router.put("/", tutorial.updateByID);
  // Delete Tutorial by ID
  router.delete("/", tutorial.deleteByID);
  // Delete all Tutorials
  router.delete("/", tutorial.deleteAll);
};
