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
    }
    
    all(req, res, next) {
      req.app.set('views', __dirname + '/views/');
      next();
    }
    
    // GET /
    index(req, res, next) {
      Task.find((err, tasks) => {
        if (err) throw err;
        res.render('index', {tasks: tasks}); 
      });
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
