module.exports = module => {
  /*
    Database module
    module.db.YOUR_MODEL_NAMES
    
    Mailer module
    module.mailer.nodemailer,
    module.mailer.transporter
  */

  class ContactFormController {
    constructor() {
    }
    
    all(req, res, next) {
      req.app.set('views', __dirname + '/views/');
      next();
    }
    
    // GET /
    index(req, res, next) {
      res.render('index'); 
    }
  }
  return new ContactFormController;
}
