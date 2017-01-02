module.exports = (options) => {
  return new Promise((res, rej) => {
    var db = options.database;
    var ${module_name.capitalize()} = db.define('${module_name.pluralize()}', {
        id: { type: "serial", key: true },
        created_at: { type: "date", time: true, defaultValue: (new Date)},
        updated_at: { type: "date", time: true, defaultValue: (new Date)}
      });
    res({${module_name.capitalize()}: ${module_name.capitalize()}});
  })
}
