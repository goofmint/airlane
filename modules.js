'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');
var common = require('./libs/common');

var Modules = function () {
  function Modules(target_dir) {
    _classCallCheck(this, Modules);

    this.modules = {};
    this.target_dir = target_dir;
    this.libraries = {};
  }

  _createClass(Modules, [{
    key: 'getModules',
    value: function getModules() {
      var _this = this;

      var me = this;
      var allModules = {};
      return new Promise(function (res, rej) {
        me.loadLibraries().then(function (libraries) {
          _this.libraries = libraries;
          var promises = [];
          var module_dir = me.target_dir + '/modules';
          fs.readdir(module_dir, function (error, files) {
            for (var i in files) {
              var dir = files[i];
              if (dir.indexOf('.') == 0) continue;
              console.log('Load module. ' + module_dir + '/' + dir);
              promises.push(me.loadModules(module_dir, dir, libraries));
            }
            Promise.all(promises).then(function (modules) {
              var results = {};
              modules.forEach(function (module) {
                Object.assign(results, module);
              });
              res(results);
            });
          });
        }, function (err) {
          return console.log('getModules #1 Error. ' + err);
        });
      });
    }
  }, {
    key: 'loadLibraries',
    value: function loadLibraries() {
      var me = this;
      return new Promise(function (res, rej) {
        fs.readdir(__dirname + '/modules/', function (error, files) {
          if (error) throw error;
          var promises = [];
          files.forEach(function (file) {
            if (!file.match(/\.js$/)) return;
            promises.push(require(__dirname + '/modules/' + file)(me.target_dir));
          });
          Promise.all(promises).then(function (results) {
            var libraries = {};
            results.forEach(function (lib) {
              Object.assign(libraries, lib);
            });
            res(libraries);
          }, function (err) {
            return console.log('loadLibraries Error. ' + err);
          });
        });
      });
    }
  }, {
    key: 'loadModules',
    value: function loadModules(module_dir, dir, libraries) {
      var me = this;
      var modules = {};
      var promises = [];
      return new Promise(function (res, rej) {
        fs.readdir(module_dir + '/' + dir, function (error, files) {
          files.forEach(function (file) {
            var fp = path.join(module_dir + '/' + dir, file);
            if (fs.statSync(fp).isDirectory()) return;
            if (!fp.match(/.*\.js$/)) return;
            promises.push(require(fp)(libraries));
          });
          Promise.all(promises).then(function (results) {
            var modules = {};
            results.forEach(function (module) {
              Object.assign(modules, module);
            });
            var obj = {};
            obj[dir] = modules;
            res(obj);
          }, function (err) {
            return console.log('loadModules Error. ' + err);
          });
        });
      });
    }
  }]);

  return Modules;
}();

;

module.exports = function (target_dir) {
  return new Modules(target_dir);
};