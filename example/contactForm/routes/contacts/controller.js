module.exports = module => {
  /*
    Database module
    module.db.YOUR_MODEL_NAMES
    
    Mailer module
    module.mailer.nodemailer,
    module.mailer.transporter
  */

  class ContactController {
    constructor() {
    }
    
    all(req, res, next) {
      req.app.set('views', __dirname + '/views/');
      next();
    }
    
    // GET /new
    new(req, res, next) {
      res.render('new'); 
    }
    
    // POST /
    create(req, res, next) {
      var Contact = new module.mailer.Contact;
      Contact.setParams(req.body);
      Contact.send()
        .then((info) => {
          res.status(200).json({});
        },
        (err) => {
          console.log(err);
          res.status(401).json({});
        })
    }
  }
  return new ContactController;
}
