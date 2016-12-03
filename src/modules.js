var fs = require('fs');

class Modules {
  constructor(options) {
    this.modules = [];
    this.options = options;
  }
  getModules(target_dir) {
    var me = this;
    return new Promise(function(res, rej) {
      try {
        console.log(`Load dir. ${target_dir}/modules`)
        fs.readdir(`${target_dir}/modules`, (error, files) => {
          for (var i in files) {
            let dir = files[i];
            if (dir.indexOf('.') == 0) {
              continue;
            }
            console.log(`Load module. ${target_dir}/modules/${dir}`)
            var module = require(`${target_dir}/modules/${dir}`)(me.options);
            
            me.modules.push(module);
          }
          res();
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

module.exports = Modules;
