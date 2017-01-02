# Making todo app

This page explains how to make a todo app with Airlane.

## Setup 

Install Airlane with npm. At first You have to install Node.js.

```
npm install airlane -g
```

After installation, create project and setup it.

```
$ airlane init todo
$ cd todo/
$ npm install
```

## Create module

You should create a database table named "Task". Airlane have provided O/R mapper and model generator.

```
$ airlane generate model db task
/path/to/todo/modules/db/task.js created.
/path/to/todo/migrations/001-create-tasks.js created.
```

Edit migration file */path/to/todo/migrations/001-create-tasks.js*.

**Before:****

```
exports.up = function(next){
  this.createTable('tasks', {
      id         : { type : "serial", key: true }, // auto increment
      created_at : { type : "date", time:true, required: true },
      updated_at : { type : "date", time:true, required: true }
  }, next);
};

exports.down = function(next){
  this.dropTable('tasks', next);
};
```

**After:**

```
exports.up = function(next){
  this.createTable('tasks', {
      id         : { type : "serial", key: true }, // auto increment
      name       : { type : "text", required: true}, // Add this line
      created_at : { type : "date", time:true, required: true },
      updated_at : { type : "date", time:true, required: true }
  }, next);
};

exports.down = function(next){
  this.dropTable('tasks', next);
};
```

Also edit model file */path/to/todo/modules/db/task.js*.

**Before:**

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

**After:**

```
module.exports = (options) => {
  return new Promise((res, rej) => {
    var db = options.database;
    var Task = db.define('tasks', {
        id: { type: "serial", key: true },
        name: { type: "text", required: true }, // Add this line
        created_at: { type: "date", time: true, defaultValue: (new Date)},
        updated_at: { type: "date", time: true, defaultValue: (new Date)}
      });
    res({Task: Task});
  })
}
```

After editing, execute migration up command.

```
$ airlane migration up
  up : 001-create-tasks.js
  migration : complete
```

If you got some errors, you can try migration again after fix problems.

```
$ airlane migration down # This command do migration down
$ airlane migration redo # This command do migration down and up.
```

## Import bootstrap

Todo app uses bootstrap for design template. You should install it using npm command.

```
$ npm install bootstrap --save
```

After installed, update JavaScript file *routes/public/app.js**

```
global.jQuery = global.$ = require('jquery');
require('bootstrap');
$(() => {
});
```

And *routes/public/app.css*.

```
@import bootstrap;
```

## Launch server

OK. You are ready to launch the server!

```
$ airlane serve
```

And access to *http://localhost:8080/*.

## Router and controller

When you access to *http://localhost:8080/*, Router that located *routes/index.js* is called index action.

```
// GET /
// Show index page
router.get('/', (req, res, next) => {
  controller.index(req, res, module.db, next);
});
```

And router call the controller index action.

```
// GET /
index(req, res, next) {
  res.render('index'); 
}
```

Response object (res) called render method with index. It means response uses *routes/views/index.jade** for rendering.

You will update those files.

## Update view

Next step, you are editing view file located *routes/views/index.jade* like below. Airlane supports jade template (it's default). And this is bootstrap style class and format.

```
extends ./layout
block title
  title Todo app
block body
  div.container
    div.row
      div.col-md-8.col-md-offset-2
        h1 Todo App
        form(action="/", method="POST")
          div.form-group
            label(for=inputTask) Task name
            input.form-control(name="name", type="text",placeholder="Study airlane")
          button.btn.btn-default(type=submit) Register task
    div.row
      div.col-md-8.col-md-offset-2
        if tasks.length < 2
          h2 #{tasks.length} Task
        else
          h2 #{tasks.length} Tasks
          
        each task in tasks
          div.row
            div.col-md-3.col-md-offset-1
              div #{task.name} 
            div.col-md-2
              span
                form(action="/#{task.id}",method="POST")
                  input.hidden(name="_method",value="DELETE")
                  button.btn.btn-ms.btn-default done
```

You can recognize a various *tasks* that provides from controller.

### Edit controller#index

You should edit controller file located *routes/controller.js* for access to *GET /*.

```
index(req, res, next) {
  let Task = module.db.Task;
  Task.find((err, tasks) => {
    if (err) throw err;
    res.render('index', {tasks: tasks}); 
  });
}
```

### Edit controller#post

Next is create action. It is called by *POST /* action.

```
// POST /
create(req, res, next) {
  let Task = module.db.Task;
  Task.create({
    name: req.body.name
  }, (err, task) => {
    if (err) throw err;
    res.redirect("/");
  })
}
```

## Edit controller#destroy

Last step is destroy action. It is called by *DELETE /:id* action.

```
// DELETE /:id
destroy(req, res, Db, next) {
  Task.get(req.params.id, (err, task) => {
    if (err) throw err;
    task.remove((err, task) => {
      res.redirect("/");
    })
  })
}
```

That's all! You made a todo app!
