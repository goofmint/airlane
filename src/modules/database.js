var path = require('path');
module.exports = (target_dir => {
  require('set-node-path')(
    path.resolve(`${target_dir}/node_modules`)
  );
  
  return new Promise( (res, rej) => {
    var config = require(`${target_dir}/config`)[process.env.NODE_ENV].database;
    var orm = require("orm");
    if (!config)
      return res({});
    var uri = `${config.driver}://`;
    if (config.username && config.password)
      uri = `${uri}${config.username}:${config.password}@`;
    if (config.host)
      uri = `${uri}${config.host}/`;
    if (config.database)
      uri = `${uri}${config.database}`;
    orm.connect(uri, (err, db) => {
      if (err) {
        rej(err);
      } else {
        res({database: db});
      }
    })
  });
});
