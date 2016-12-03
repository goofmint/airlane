module.exports = (options) => {
  var User = require('./user')(options);
  return [User];
}
