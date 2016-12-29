'use strict';

module.exports = function (target_dir) {
  var database = require(target_dir + '/config')[process.env.NODE_ENV].database;
  var Sequelize = require('sequelize');
  var db = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.driver,
    storage: (database.driver === 'sqlite') ? `${target_dir}/${database.database}.sqlite3` : null
  });
  return {
    database: db,
    Sequelize: Sequelize
  };
};