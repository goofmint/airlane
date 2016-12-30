module.exports = ((target_dir) => {
  var smtp = require(`${target_dir}/config`)[process.env.NODE_ENV].smtp;
  var nodemailer = require('nodemailer');
  var uri = "";
  uri = `smtp${smtp.secure ? 's' : ''}://`;
  if (smtp.user && smtp.pass) {
    uri = `${uri}${encodeURIComponent(smtp.user)}:${encodeURIComponent(smtp.password)}@`;
  }
  if (smtp.server) {
    uri = `${uri}${smtp.server}`;
  }
  if (smtp.port && smtp.port != 25) {
    uri = `${uri}:${smtp.port}`;
  }
  var transporter = nodemailer.createTransport(uri);
  return {
    nodemailer: nodemailer,
    transporter: transporter
  };
});
