module.exports = module => {
  let Task = module.db.Task;
  /*
    Database module
    module.db.YOUR_MODEL_NAMES
    
    Mailer module
    module.mailer.nodemailer,
    module.mailer.transporter
  */

  class TodoController {
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
      Task.find((err, tasks) => {
        if (err) throw err;
        res.render('index', {tasks: tasks}); 
      });
    }
    
    // GET /new
    new(req, res, next) {
      res.render('new'); 
    }
    
    // POST /
    create(req, res, next) {
      Task.create({
        name: req.body.name
      }, (err, task) => {
        if (err) throw err;
        res.redirect("/");
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
    destroy(req, res, Db, next) {
      Task.get(req.params.id, (err, task) => {
        if (err) throw err;
        task.remove((err, task) => {
          res.redirect("/");
        })
      })
    }
  }
  return new TodoController;
}
