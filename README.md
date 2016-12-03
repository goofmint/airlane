# Linear

Linear is the fast development environments with express. Inspired micro services.

## Features

- Routing
- Database with O/R mapper (Sequelize)
- Each routing has own MVC structure
- Code generator
- Support ES2015
- Development server

## Install

```
npm install linear -g
```

## Usage

```
cd some/path
linear init app # Your application name
linear serve
```

Open http://localhost:8080/

## Constructors

Linear generates those files.

```
$ tree .
.
├── config.js
├── modules
├── package.json
├── routes
│   ├── controller.js
│   ├── index.js
│   ├── public
│   │   ├── app.css
│   │   └── app.js
│   └── views
│       ├── edit.jade
│       ├── index.jade
│       └── new.jade
└── tmp
```

- config.js is development configures.
- module contains database model, libraries.
- routes contains controller, router, javascript, stylesheets, and views.
- tmp is for temporary files like session database.

Default router supports below.

- GET /
- GET /new
- GET /:id/edit
- POST /
- PUT /:id
- DELETE /:id

## Add new routes.

When you add new routes like /users, you should enter command below.

```
$ linear generate route users
```

Linear generates those files.

```
$ tree .
.
├── routes
│   ├── users
│   │   ├── controller.js
│   │   ├── index.js
│   │   ├── public
│   │   │   ├── app.css
│   │   │   └── app.js
│   │   └── views
│   │       ├── edit.jade
│   │       ├── index.jade
│   │       └── new.jade
```

Each route has own MVC inside routes directory. After generating, you have those routes.

- GET /users
- GET /users/new
- GET /users/:id/edit
- POST /users
- PUT /users/:id
- DELETE /users/:id

## Modules

Linear has no module generator. You can make files like this.

```
modules/
└── db
    ├── index.js
    └── user.js
```

**index.js**

```
module.exports = (options) => {
  var User = require('./user')(options);
  return [User];
}
```

**user.js:**

```
// var sequelize = require('../../libs/database');
var crypto = require("crypto");

module.exports = (options) => {
  var database = options.database;
  var Sequelize = database.Sequelize;
  var db = database.database;

  var User = db.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    :
  }, {
    freezeTableName: true
  });

  User.role = 'User';
  return User;
}
```

Linear supports Sequelize for O/R mapping. And you can use modules in router.

```
router.get('/new', (req, res, next) => {
  console.log(req.app.linear.modules); // All modules
  console.log(req.app.linear.modules.find('User')); // Get user module. You decide it with module's role like User.role = 'User';
  controller.new(req, res, next);
});
```

### LICENSE

MIT License