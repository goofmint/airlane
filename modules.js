'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');

var Modules = function () {
  function Modules(options) {
    _classCallCheck(this, Modules);

    this.modules = {};
    this.options = options;
  }

  _createClass(Modules, [{
    key: 'loadModules',
    value: function loadModules(module_dir, dir) {
      var me = this;
      var modules = {};
      return new Promise(function (res, rej) {
        fs.readdir(module_dir + '/' + dir, function (error, files) {
          files.forEach(function (file) {
            var fp = path.join(module_dir + '/' + dir, file);
            if (fs.statSync(fp).isDirectory()) return;
            if (!fp.match(/.*\.js$/)) return;
            modules[file.replace(/\.js$/, "").capitalize()] = require(fp)(me.options);
          });
          res([dir.capitalize(), modules]);
        });
      });
    }
  }, {
    key: 'getModules',
    value: function getModules(target_dir) {
      var me = this;
      var allModules = {};
      return new Promise(function (res, rej) {
        var promises = [];
        try {
          (function () {
            console.log('Load dir. ' + target_dir + '/modules');
            var module_dir = target_dir + '/modules';
            fs.readdir(module_dir, function (error, files) {
              for (var i in files) {
                var dir = files[i];
                if (dir.indexOf('.') == 0) continue;
                console.log('Load module. ' + module_dir + '/' + dir);
                promises.push(me.loadModules(module_dir, dir));
              }
              Promise.all(promises).then(function (modules) {
                modules.forEach(function (module) {
                  allModules[module[0]] = module[1];
                });
                res(allModules);
              });
            });
          })();
        } catch (e) {
          rej(e);
        }
      });
    }
  }, {
    key: 'find',
    value: function find(role) {
      var results = [];
      for (var i in this.modules) {
        var module = this.modules[i];
        if (Array.isArray(module)) {
          for (var j in module) {
            if (module[j].role == role) {
              results.push(module[j]);
            }
          }
        } else {
          if (module.role == role) {
            results.push(module);
          }
        }
      }
      return results;
    }
  }]);

  return Modules;
}();

;

/*
var modules = new Modules;
modules.getModules(target_dir).then(() => {
}, 
(e) => {
  console.error(e);
});
*/

module.exports = Modules;