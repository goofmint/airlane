module.exports = ((target_dir) => {
  var database = require(`${target_dir}/config`)[process.env.NODE_ENV].database;
  var Sequelize = require('sequelize');
  var db = new Sequelize(database.database, database.username, database.password, {
    host: database.host,
    dialect: database.driver
  });
  return {
    database: db,
    Sequelize: Sequelize
  };
});
