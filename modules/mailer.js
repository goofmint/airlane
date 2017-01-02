'use strict';

module.exports = function (target_dir) {
  return new Promise(function (res, rej) {
    var smtp = require(target_dir + '/config')[process.env.NODE_ENV].smtp;
    if (!smtp) return res({});
    var nodemailer = require('nodemailer');
    var uri = "";
    uri = 'smtp' + (smtp.secure ? 's' : '') + '://';
    if (smtp.user && smtp.pass) {
      uri = '' + uri + encodeURIComponent(smtp.user) + ':' + encodeURIComponent(smtp.password) + '@';
    }
    if (smtp.server) {
      uri = '' + uri + smtp.server;
    }
    if (smtp.port && smtp.port != 25) {
      uri = uri + ':' + smtp.port;
    }
    var transporter = nodemailer.createTransport(uri);
    res({
      mailer: {
        nodemailer: nodemailer,
        transporter: transporter
      }
    });
  });
};