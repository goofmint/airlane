module.exports = (options) => {
  var database = options.database;
  var Sequelize = database.Sequelize;
  var db = database.database;

  var ${module_name.capitalize()} = db.define('${module_name.pluralize()}', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    created_at: {
      type: Sequelize.DATE,
      default: new Date
    },
    updated_at: {
      type: Sequelize.DATE,
      default: new Date
    }
  }, {
    freezeTableName: true
  });

  ${module_name.capitalize()}.sync().then(() => {
  });

  ${module_name.capitalize()}.role = '${module_name.capitalize()}';
  return ${module_name.capitalize()};
}