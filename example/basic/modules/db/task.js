module.exports = (options) => {
  var database = options.database;
  var Sequelize = database.Sequelize;
  var db = database.database;

  var Task = db.define('tasks', {
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

  Task.sync().then(() => {
  });

  Task.role = 'Task';
  return Task;
}