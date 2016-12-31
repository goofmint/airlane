var fs = require('fs');
var path = require('path');
var common = require('./libs/common');

class Modules {
  constructor(target_dir) {
    var database = require('./libs/database')(target_dir);
    var mailer   = require('./libs/mailer')(target_dir);
    this.modules = {};
    this.target_dir = target_dir;
    this.options = {database: database, mailer: mailer};
  }
  loadModules(module_dir, dir) {
    var me = this;
    var modules = {};
    return new Promise( (res, rej) => {
      fs.readdir(`${module_dir}/${dir}`, (error, files) => {
        files.forEach((file) => {
          let fp = path.join(`${module_dir}/${dir}`, file);
          if (fs.statSync(fp).isDirectory()) return;
          if (!fp.match(/.*\.js$/)) return;
          modules[file.replace(/\.js$/, "").capitalize()] = require(fp)(me.options);
        });
        res([dir.capitalize(), modules]);
      });
    })
  }
  
  getModules() {
    var me = this;
    var allModules = {};
    return new Promise((res, rej) => {
      let promises = [];
      try {
        let module_dir = `${this.target_dir}/modules`;
        console.log(`Load dir. ${module_dir}`);
        fs.readdir(module_dir, (error, files) => {
          for (var i in files) {
            let dir = files[i];
            if (dir.indexOf('.') == 0) continue;
            console.log(`Load module. ${module_dir}/${dir}`)
            promises.push(me.loadModules(module_dir, dir));
          }
          Promise.all(promises)
            .then(modules => {
              modules.forEach( (module) => {
                allModules[module[0]] = module[1];
              })
              res(allModules);
            })
        });
      } catch(e) {
        rej(e);
      }
    });
  }
  
  find(role) {
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
};

/*
var modules = new Modules;
modules.getModules(target_dir).then(() => {
}, 
(e) => {
  console.error(e);
});
*/

module.exports = (target_dir) => {
  return new Modules(target_dir);
}