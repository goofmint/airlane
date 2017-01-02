var fs = require('fs');
var path = require('path');
var common = require('./libs/common');

class Modules {
  constructor(target_dir) {
    this.modules = {};
    this.target_dir = target_dir;
    this.libraries = {};
  }
  
  getModules() {
    var me = this;
    var allModules = {};
    return new Promise((res, rej) => {
      me.loadLibraries()
        .then( libraries => {
          this.libraries = libraries;
          let promises = [];
          let module_dir = `${me.target_dir}/modules`;
          fs.readdir(module_dir, (error, files) => {
            for (var i in files) {
              let dir = files[i];
              if (dir.indexOf('.') == 0) continue;
              console.log(`Load module. ${module_dir}/${dir}`)
              promises.push(me.loadModules(module_dir, dir, libraries));
            }
            Promise.all(promises)
              .then((modules) => {
                var results = {};
                modules.forEach(module => {
                  Object.assign(results, module);
                })
                res(results);
              })
          });
        }, (err) => console.log(`getModules #1 Error. ${err}`))
    });
  }
  
  loadLibraries() {
    let me = this;
    return new Promise( (res, rej) => {
      fs.readdir(`${__dirname}/modules/`, (error, files) => {
        if (error) throw error;
        let promises = [];
        files.forEach( file => {
          if (!file.match(/\.js$/)) return;
          promises.push(require(`${__dirname}/modules/${file}`)(me.target_dir));
        })
        Promise.all(promises)
          .then(results => {
            let libraries = {};
            results.forEach( lib => {
              Object.assign(libraries, lib);
            })
            res(libraries);
          }, (err) => console.log(`loadLibraries Error. ${err}`))
      });
    });
  }
  
  loadModules(module_dir, dir, libraries) {
    var me = this;
    var modules = {};
    var promises = [];
    return new Promise( (res, rej) => {
      fs.readdir(`${module_dir}/${dir}`, (error, files) => {
        files.forEach((file) => {
          let fp = path.join(`${module_dir}/${dir}`, file);
          if (fs.statSync(fp).isDirectory()) return;
          if (!fp.match(/.*\.js$/)) return;
          promises.push(require(fp)(libraries));
        });
        Promise.all(promises)
          .then( results => {
            let modules = {};
            results.forEach(module => {
              Object.assign(modules, module);
            });
            var obj = {};
            obj[dir] = modules;
            res(obj);
          }, (err) => console.log(`loadModules Error. ${err}`))
      });
    })
  }
  
};

module.exports = (target_dir) => {
  return new Modules(target_dir);
}