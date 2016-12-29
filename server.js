'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =======================
// get instance we need
// =======================
process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = (0, _express2.default)();
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var fs = require('fs-extra');
var session = require('express-session');
var NedbStore = require('connect-nedb-session')(session);
var target_dir = fs.realpathSync('./');
var config = require(target_dir + '/config')[process.env.NODE_ENV];
var database = require('./libs/database')(target_dir);
var common = require('./libs/common');
var Modules = require('./modules');
var methodOverride = require('method-override');

var modules = new Modules({ database: database });
modules.getModules(target_dir).then(function () {
  console.log("Module loaded.");
}, function (e) {
  console.error(e);
  process.exit(1);
});

app.airlane = {
  modules: modules.modules
};

// =======================
// configuration
// =======================
var port = process.env.PORT || 8080;

// request parameter parser
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride(function (req, res) {
  console.log('req.body', req.body);
  if (req.body && _typeof(req.body) === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// static file folder
app.use(_express2.default.static(target_dir + '/public'));

// html template
if (config.view_engine) app.set('view engine', config.view_engine);
app.set('views', __dirname + '/views');

app.use(session({
  secret: config.session_key,
  resave: false,
  saveUninitialized: true,
  store: new NedbStore({
    filename: path.join(target_dir, '/tmp/session.nedb')
  })
}));

// =======================
// routes
// =======================

var addRouter = function addRouter(app, path) {
  fs.readdir(path, function (error, files) {
    for (var i in files) {
      var dir = files[i];
      if (dir.indexOf('.') == 0) continue;
      if (fs.statSync(path + '/' + dir).isFile()) continue;
      if (['public', 'views'].indexOf(dir) > 0) continue;

      if (fs.existsSync(path + '/' + dir + '/index.js')) {
        var lib = require(path + '/' + dir);
        var url_path = path.replace(__dirname + '/app', "") + ('/' + dir);
        console.log("Add rountes", url_path);
        app.use('' + url_path, lib.router);
        if (fs.existsSync(path + '/' + dir + '/public')) {
          console.log("Public directory", path + '/' + dir + '/public', ". Access from browser", url_path);
          app.use(url_path + '/', _express2.default.static(path + '/' + dir + '/public'));
        }
      }
      addRouter(app, path + '/' + dir);
    }
  });
};
// Root access.


app.use('/', require(target_dir + '/routes').router);
app.use('/', _express2.default.static(target_dir + '/routes/public'));

addRouter(app, target_dir + '/routes');

// =======================
// start the server
// =======================
app.listen(port);
console.log('application started');