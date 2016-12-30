# How to use database on Airlane

Airlane supports some database systems.

- SQLite3
- MySQL/MariaDB
- PostgreSQL
- MS SQL

Airlane uses O/R mapper named [Sequelize](http://docs.sequelizejs.com/en/v3/). If you want to know about how to use the Sequelize, you should read their document.

## Generate base model

You can generate skeleton code with command.

```
airlane generate model db task
```

This command generates a JavaScript file located to *hello/modules/db/task.js*.

```
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
```

Base code has 3 colmuns.

- **id** 
Unique key.
- **created_at**  
Created time. You should never update it.
- **updated_at**  
Last updated time. You should update it with data updates.

### Using model with controller

*routes/index.js* has database variable.

```
module.exports = module => {
  /*
    Database module
    module.Db.Sequelize
    module.Db.db
  */
  :
}
```

So, you change the code like below.

**Before:**

```
router.get('/', (req, res, next) => {
  controller.index(req, res, next);
});
```

**After:**

```
router.get('/', (req, res, next) => {
  controller.index(req, res, module.Db, next);
});
```

And change *routes/controler.js*.

```
// GET /
index(req, res, Db, next) {
  let Task = Db.Task;
  Task.findAll()
    .then( tasks => {
      res.render('index', {tasks: tasks}); 
    });
}
```

Then, you can use database easily.
