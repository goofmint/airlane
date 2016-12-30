var fs = require('fs-extra');
let inquirer = require("inquirer");

utils = {};

utils.checkFile = (target_dir, paths) => {
  var promises = [];
  for (var i in paths) {
    promises.push(new Promise((res, rej) => {
      var filename = paths[i];
      try {
        fs.stat(`${target_dir}${filename}`, (err, fd) => {
          if (err == null) {
            return res({
              type: 'confirm',
              name: `overwrite_${filename}`,
              message: `File or Directory ${target_dir}${filename} exist. Could you overwrite it?`,
              default: true
            });
          }
          return res(null)
        });
      } catch (e) {
        if (e.code == 'ENOENT') {
          return res(null);
        }
        return rej(e);
      }
    }));
  }
  return promises;
}

utils.doAsk = promises => {
  return new Promise((res, rej) => {
    Promise.all(promises).then((values) => {
      var questions = values.filter(function(question) {
        return question != null;
      });
      if (questions.length === 0) {
        return res();
      }
      inquirer.prompt(questions).then((answers) => {
        return res(answers);
      })
      .catch(error => {
        rej(error);
      });
    }, (error) => {
      rej(error);
    });
  });
}


module.exports = utils;