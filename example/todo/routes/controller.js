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
  index(req, res, Db, next) {
    let Task = Db.Task;
    Task.findAll()
      .then( tasks => {
        res.render('index', {tasks: tasks}); 
      });
  }
  
  // GET /new
  new(req, res, next) {
    res.render('new'); 
  }
  
  // POST /
  create(req, res, Db, next) {
    let Task = Db.Task;
    Task.create({
      name: req.body.name
    })
    .then((task) => {
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
    let Task = Db.Task;
    Task.findById(req.params.id)
      .then( task => {
        task.destroy()
      })
      .then( () => {
        res.redirect("/");
      })
  }
}

module.exports = new TodoController;
