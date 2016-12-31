'use strict';

var path = require('path');
module.exports = function (target_dir) {
  require('set-node-path')(path.resolve(target_dir + '/node_modules'));
  var database = require(target_dir + '/config')[process.env.NODE_ENV].database;
  var Sequelize = require('sequelize');
  var db = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.driver
  });
  return {
    database: db,
    Sequelize: Sequelize
  };
};