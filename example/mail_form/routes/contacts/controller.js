
class ContactController {
  constructor() {
    // Authentication expected.
    this.expected = [
      // Define like below.
      // {url: '/new', method: 'GET'}
    ];
    // Authentication required.
    this.required = [
      // Define like below.
      // {url: '/:id/', method: 'PUT'},
    ]
  }
  
  all(req, res, next) {
    req.app.set('views', __dirname + '/views/');
    // Authentication expected
    // common.exclude_authentication(this.expected, req, res);
    
    // Authentication required
    // common.require_authentication(this.required, req, res, `/auth/new?path=${req.url}`);
    next();
  }
  
  // GET /
  index(req, res, next) {
    res.render('index'); 
  }
  
  // POST /
  // GET /new
  new(req, res, next) {
    res.render('new'); 
  }
  
  // POST /
  create(req, res, next) {
    var Contact = new req.app.airlane.modules.Mailer.Contact;
    Contact.setParams(req.body);
    Contact.send()
      .then((info) => {
        res.status(200).json({});
      },
      (err) => {
        res.status(401).json({});
      })
  }
  
  // GET /:id/edit
  edit(req, res, next) {
    res.render('edit'); 
  }
  
  // PUT /:id
  update(req, res, next) {
  }
  
  // DELETE /:id
  destroy(req, res, next) {
    res.status(200).json({});
  }
}

module.exports = new ContactController;
