'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var Modules = function () {
  function Modules(options) {
    _classCallCheck(this, Modules);

    this.modules = {};
    this.options = options;
  }

  _createClass(Modules, [{
    key: 'getModules',
    value: function getModules(target_dir) {
      var me = this;
      return new Promise(function (res, rej) {
        try {
          console.log('Load dir. ' + target_dir + '/modules');
          fs.readdir(target_dir + '/modules', function (error, files) {
            for (var i in files) {
              var dir = files[i];
              if (dir.indexOf('.') == 0) {
                continue;
              }
              console.log('Load module. ' + target_dir + '/modules/' + dir);
              var module = require(target_dir + '/modules/' + dir)(me.options);
              me.modules[dir.capitalize()] = module;
            }
            res();
          });
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