var randomstring = require("randomstring");

module.exports = (module_name, init = false) => {
  if (init) {
    var controllerName = module_name.capitalize();
    module_name = "";
  } else {
    var controllerName = module_name.replace(/\//g, " ").capitalize();
  }
  var templates = {
    'index.js': `var express = require('express');
var router = express.Router();
var controller = require('./controller')

// Every methods go through this function.
// You can use it for before filter like checking authentication.
router.all('*',  (req, res, next) => {
  controller.all(req, res, next);
});

// GET ${module_name}/
// Show index page
router.get('/', (req, res, next) => {
  controller.index(req, res, next);
});

// GET ${module_name}/new
// Show create page
router.get('/new', (req, res, next) => {
  controller.new(req, res, next);
});

// POST ${module_name}
// Create something.
router.post('/', (req, res, next) => {
  controller.create(req, res, next);
});

// GET ${module_name}/:id/edit
// Show edit page
router.get('/:id/edit', (req, res, next) => {
  controller.edit(req, res, next);
});

// PUT ${module_name}/:id
// Update something.
router.put('/:id', (req, res, next) => {
  controller.update(req, res, next);
});

// DELETE ${module_name}/:id
// Delete something.
router.delete('/:id', (req, res, next) => {
  controller.destroy(req, res, next);
});

// Return with router key.
module.exports = {
  router: router
};
`,
  'controller.js': `
class ${controllerName}Controller {
  constructor() {
    // Authentication expected.
    this.expected = [
      // Define like below.
      // {url: '/new', method: 'GET'}
    ];
    // Authentication required.
    this.required = [
      // Define like below.
      // {url: '/:id/', method: 'PUT'},
    ]
  }
  
  all(req, res, next) {
    req.app.set('views', __dirname + '/views/');
    // Authentication expected
    // common.exclude_authentication(this.expected, req, res);
    
    // Authentication required
    // common.require_authentication(this.required, req, res, \`/auth/new?path=$\{req.url\}\`);
    next();
  }
  
  // GET /
  index(req, res, next) {
    res.render('index'); 
  }
  
  // POST /
  // GET /new
  new(req, res, next) {
    res.render('new'); 
  }
  
  // POST /
  create(req, res, next) {
  }
  
  // GET /:id/edit
  edit(req, res, next) {
    res.render('edit'); 
  }
  
  // PUT /:id
  update(req, res, next) {
  }
  
  // DELETE /:id
  destroy(req, res, next) {
    res.status(200).json({});
  }
}

module.exports = new ${controllerName}Controller;
`,
  'views/layout.jade': `doctype html
html
  head
    block title
    meta(charset="utf-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    ${module_name == "" ? "" : 'link(rel="stylesheet", type="text/css", href="/app.min.css")'}
    link(rel="stylesheet", type="text/css", href="/${module_name == "" ? "" : module_name + "/"}app.min.css")
  body
    block body
    ${module_name == "" ? "" : 'script(src="/app.min.js")'}
    script(src="/${module_name == "" ? "" : module_name + "/"}app.min.js")
`,
  'views/new.jade': `extends ./layout
block title
  title ${module_name}#new
block body
  h1 ${module_name}#new
`,
  'views/index.jade': `extends ./layout
block title
  title ${module_name}#index
block body
  h1 ${module_name}#index
`,
  'views/edit.jade': `extends ./layout
block title
  title ${module_name}#edit
block body
  h1 ${module_name}#edit
`,
  'public/app.js': `// JavaScript
`,
  'public/app.css': `/* Stylesheet */
`,
  'init': {
    'config.js': `module.exports = {
  development: {
    session_key: '${randomstring.generate(30)}',
    view_engine: 'jade',
    smtp: {
      secure: true,
      user: 'user',
      password: 'password',
      server: 'smtp.example.com'
    },
    database: {
      driver: 'sqlite',
      host: 'localhost',
      database: '${controllerName.toLowerCase()}_development'
    }
  }
}`,
    'package.json': `{
  "name": "${controllerName.toLowerCase()}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "",
  "dependencies": {
    "sqlite3": "^3.1.8",
    "jade": "^1.11.0"
  }
}`
    },
  'db_model': `module.exports = (options) => {
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
}`
  }
  return templates;
}
