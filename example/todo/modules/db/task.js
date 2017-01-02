module.exports = (options) => {
  return new Promise((res, rej) => {
    var db = options.database;
    var Task = db.define('tasks', {
        id: { type: "serial", key: true },
        name: { type: "text", required: true },
        created_at: { type: "date", time: true, defaultValue: (new Date)},
        updated_at: { type: "date", time: true, defaultValue: (new Date)}
      });
    res({Task: Task});
  })
}
