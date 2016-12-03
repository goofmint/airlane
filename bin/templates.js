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
  'views/new.jade': `doctype html
html
  head
    title ${module_name}#new
    meta(charset="utf-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    link(rel="stylesheet", type="text/css", href="/${module_name}/app.css")
  body
    h1 ${module_name}#new
      
    script(src="/js/app.js")
    script(src="/${module_name}/app.js")
  `,
  'views/index.jade': `doctype html
html
  head
    title ${module_name}#new
    meta(charset="utf-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    link(rel="stylesheet", type="text/css", href="/${module_name}/app.css")
  body
    h1 ${module_name}#Index
      
    script(src="/js/app.js")
    script(src="/${module_name}/app.js")
  `,
  'views/edit.jade': `doctype html
html
  head
    title ${module_name}#edit
    meta(charset="utf-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    link(rel="stylesheet", type="text/css", href="/${module_name}/app.css")
  body
    h1 ${module_name}#edit
      
    script(src="/js/app.js")
    script(src="/${module_name}/app.js")`,
  'public/app.js': `// JavaScript
`,
  'public/app.css': `/* Stylesheet */
`,
  'init': {
    'config.js': `module.exports = {
  development: {
    session_key: '${randomstring.generate(30)}',
    database: {
      driver: 'sqlite',
      host: 'localhost',
      username: 'username',
      password: 'password',
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
    "sqlite3": "^3.1.8"
  }
}`
    }
  }
  return templates;
}
