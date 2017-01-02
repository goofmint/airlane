
exports.up = function(next){
  this.createTable('${module_name.pluralize()}', {
      id         : { type : "serial", key: true }, // auto increment
      created_at : { type : "date", time:true, required: true },
      updated_at : { type : "date", time:true, required: true }
  }, next);
};

exports.down = function(next){
  this.dropTable('${module_name.pluralize()}', next);
};
