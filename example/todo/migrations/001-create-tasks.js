
exports.up = function(next){
  this.createTable('tasks', {
      id         : { type : "serial", key: true }, // auto increment
      name       : { type : "text", required: true},
      created_at : { type : "date", time:true, required: true },
      updated_at : { type : "date", time:true, required: true }
  }, next);
};

exports.down = function(next){
  this.dropTable('tasks', next);
};
