// =======================
// get instance we need
// =======================
process.env.NODE_ENV  = process.env.NODE_ENV || "development";

import express from 'express'

var app               = express();
var bodyParser        = require('body-parser');
var session           = require('express-session');
var path              = require('path');
var fs                = require('fs-extra');
var session           = require('express-session');
var NedbStore         = require('connect-nedb-session')(session)
let target_dir        = fs.realpathSync('./');

require('set-node-path')(
  path.resolve(`${target_dir}/node_modules`)
);

var config            = require(`${target_dir}/config`)[process.env.NODE_ENV];

var common            = require('./libs/common');
var methodOverride    = require('method-override');

// =======================
// configuration
// =======================
var port = process.env.PORT || 8080;

// request parameter parser
app.use(bodyParser.urlencoded({
  extended: true
}));
        
app.use( methodOverride( (req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}) );        

// static file folder
app.use(express.static(`${target_dir}/public`));

// html template
if (config.view_engine)
  app.set('view engine', config.view_engine);
app.set('views', __dirname + '/views');

app.use(session({
  secret: config.session.key,
  resave: false,
  saveUninitialized: true,
  store: new NedbStore({
    filename: path.join(target_dir, config.session.path)
  })
}));

// =======================
// routes
// =======================
var addRouter = (app, module, path, base_path) => {
  fs.readdir(path, (error, files) => {
    for (var i in files) {
      let dir = files[i];
      if (dir.indexOf('.') == 0)
        continue;
      if (fs.statSync(`${path}/${dir}`).isFile())
        continue;
      if (['public', 'views'].indexOf(dir) > 0)
        continue;
      
      if (fs.existsSync(`${path}/${dir}/index.js`)) {
        var router = require(`${path}/${dir}`)(module);
        let url_path = path.replace(base_path, "") + `/${dir}`;
        console.log("Add rountes", url_path)
        app.use(`${url_path}`, router);
        if (fs.existsSync(`${path}/${dir}/public`)) {
          console.log("Public directory", `${path}/${dir}/public`, ". Access from browser", url_path);
          app.use(`${url_path}/`, express.static(`${path}/${dir}/public`));
        }
      }
      addRouter(app, module, `${path}/${dir}`, base_path);
    }
  });
}

// Root access.
var Module = require('./modules')(target_dir);
Module.getModules().then((module) => {
  app.use('/', require(`${target_dir}/routes`)(module));
  app.use('/', express.static(`${target_dir}/routes/public`));
  let base_path = `${target_dir}/routes`;
  addRouter(app, module, base_path, base_path);
}, (e) => {
  console.error(e);
  process.exit(1);
});


// =======================
// start the server
// =======================
app.listen(port);
console.log(`application started http://localhost:${port}/`);
