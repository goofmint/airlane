# How to use database on Airlane

Airlane supports some database systems.

- SQLite3
- MySQL/MariaDB
- PostgreSQL
- Amazon Redshift

Airlane uses O/R mapper named [ORM2](https://github.com/dresende/node-orm2). If you want to know about how to use the ORM2, you should read their document.

## Generate base model

You can generate skeleton code with command.

```
airlane generate model db task
```

This command generates a JavaScript file located to *hello/modules/db/task.js*.

```
module.exports = (options) => {
  return new Promise((res, rej) => {
    var db = options.database;
    var Task = db.define('tasks', {
        id: { type: "serial", key: true },
        created_at: { type: "date", time: true, defaultValue: (new Date)},
        updated_at: { type: "date", time: true, defaultValue: (new Date)}
      });
    res({Task: Task});
  })
}
```

Base code has 3 colmuns.

- **id** 
Unique key.
- **created_at**  
Created time. You should never update it.
- **updated_at**  
Last updated time. You should update it with data updates.

## Migration

When you make a model file, Airlane also generates migration file located *migrations/999-create-xxx.js*

```

exports.up = function(next){
  this.createTable('xxx', {
      id         : { type : "serial", key: true }, // auto increment
      created_at : { type : "date", time:true, required: true },
      updated_at : { type : "date", time:true, required: true }
  }, next);
};

exports.down = function(next){
  this.dropTable('xxx', next);
};
```

You can change to fit your scheme. And execute it. Airlane execute sql to your database.

```
$ airlane migration up
```

### Generate migration file

You can manage database scheme with Airlane.

```
airlane generate migration something
  create : /Users/nakatsugawa/Documents/airline/example/todo/migrations/999-something.js
```

You can fix it, and execute migration. Migration format follows [locomote/node-migrate-orm2](https://github.com/locomote/node-migrate-orm2). After fix the scheme, you have to fix your model file's define.

```
exports.up = function(next){
  next();
};

exports.down = function(next){
  next();
};
```

## Using model with controller

*routes/index.js* and *routes/controller.js* have database variable.

```
module.exports = module => {
  /*
    Database module
    module.db.YOUR_MODEL_NAMES
  */
  :
}
```

And change *routes/controler.js*.

```
let Task = module.db.Task;

// GET /
index(req, res, next) {
  Task.find((err, tasks) => {
    if (err) throw err;
    res.render('index', {tasks: tasks}); 
  });
}
```

Then, you can use database easily.
