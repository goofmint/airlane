var fs = require('fs');

module.exports = (options) => {
  var mailer =  options.mailer.mailer;
  var transporter = options.mailer.transporter;

  class Contact {
    constructor() {
      this.role = 'Mailer'
      this.options = {
        from: '"Test mailer" <test@example.com>',
        subject: 'Thank you for your contact'
      };
      this.body = fs.readFileSync(`${__dirname}/body.txt`, 'utf-8');
    }
    
    setParams(params) {
      this.options.to = `"${params.name}" <${params.email}>`;
      let body = this.body;
      for (var key in params) {
        body = body.replace(`__${key.toUpperCase()}__`, params[key]);
      }
      this.options.text = body;
    }
    
    send() {
      var me = this;
      return new Promise((res, rej) => {
        transporter.sendMail(me.options, (error, info) => {
          // If error,
          /*
          {
            "code": "ECONNECTION",
            "errno": "ENOTFOUND",
            "syscall": "getaddrinfo",
            "hostname": "smtp.example.com",
            "host": "smtp.example.com",
            "port": 465,
            "command": "CONN"
          }
          */
          if(error)
            return rej(error);
          // If success,
          /*
          {
            "accepted": [
              "test2@example.com"
            ],
            "rejected": [],
            "response": "250 Ok",
            "envelope": {
              "from": "test@example.com",
              "to": [
                  "test2@example.com"
              ]
            },
            "messageId": "9999999-9999-9999-9999-999999999999@example.com"
          }
          */
          res(info);
        });
      })
    }
  };

  return Contact;
}