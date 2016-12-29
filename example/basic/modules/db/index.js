let fs = require('fs');
let target_dir = fs.realpathSync('./');

module.exports = (options) => {
  let models = {};
  fs.readdir(`${target_dir}/modules/db`, (error, files) => {
    files.forEach((file, i) => {
      if (file.match(/^\./)) {
        return;
      }
      if (file === 'index.js')
        return;
      if (!file.match(/.*\.js$/))
        return;
      file = file.replace(/\.js$/g, "");
      models[file.capitalize()] = require(`./${file}`)(options)
    })
  });
  return models;
}
