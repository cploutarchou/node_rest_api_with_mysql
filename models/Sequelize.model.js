/**
 * Created by Christos Ploutarchou
 * Project : node_rest_api_with_mysql
 * Filename : Tutorial.js
 * Date: 04/04/2020
 * Time: 00:01
 **/
module.exports = (db, Column) => {
  return db.define("rest-api-tutorial", {
    title: {
      type: Column.STRING
    },
    description: {
      type: Column.STRING
    },
    published: {
      type: Column.BOOLEAN
    },
    publisher_name: {
      type: Column.STRING
    }
  });
};
