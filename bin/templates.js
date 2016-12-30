var randomstring = require("randomstring");
var path = require('path');
var fs = require('fs');

module.exports = (module_name, init = false) => {
  if (init) {
    var controllerName = module_name.capitalize();
    module_name = "";
  } else {
    var controllerName = module_name.replace(/\//g, " ").capitalize();
  }
  
  let template_dir = fs.realpathSync(`${__dirname}/../skeleton/`);
  var templates = {};
  var getTemplateFiles = (template_dir, base_dir) => {
    var results = {};
    var promises = [];
    return new Promise((res, rej) => {
      fs.readdir(template_dir, (error, files) => {
        if (error)
          return;
        for (var i in files) {
          let file = files[i];
          let fp = path.join(template_dir, file);
          if (fs.statSync(fp).isDirectory()) {
            promises.push(getTemplateFiles(fp, base_dir));
          }else{
            if (!fp.match(/.*\.(js|json|jade|css)$/)) continue;
            var content = fs.readFileSync(fp, {encoding: "utf-8"});
            var evaled  = eval('`'+content+'`');
            results[fp.replace(`${base_dir}/`, "")] = evaled;
          }
        }
        if (promises.length > 0) {
          Promise.all(promises)
            .then(ary => {
              for (var i in ary) {
                Object.assign(results, ary[i]);
              }
              res(results);
            })
        }else{
          res(results);
        }
      });
    })
  }
  
  return getTemplateFiles(template_dir, template_dir);
}
