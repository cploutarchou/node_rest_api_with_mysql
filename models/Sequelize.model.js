/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (database, Sequelize) => {
  return database.define("restTutorial", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    publisher: {
      type: Sequelize.STRING
    }
  });
};
