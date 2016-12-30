var express = require('express');
var router = express.Router();
var controller = require('./controller')

module.exports = module => {
  /*
    Database module
    module.database.Sequelize
    module.database.db
    
    Mailer module
    module.mailer.nodemailer,
    module.mailer.transporter
  */
  
  // Every methods go through this function.
  // You can use it for before filter like checking authentication.
  router.all('*',  (req, res, next) => {
    controller.all(req, res, next);
  });

  // GET ${module_name}/
  // Show index page
  router.get('/', (req, res, next) => {
    controller.index(req, res, next);
  });

  // GET ${module_name}/new
  // Show create page
  router.get('/new', (req, res, next) => {
    controller.new(req, res, next);
  });

  // POST ${module_name}
  // Create something.
  router.post('/', (req, res, next) => {
    controller.create(req, res, next);
  });

  // GET ${module_name}/:id/edit
  // Show edit page
  router.get('/:id/edit', (req, res, next) => {
    controller.edit(req, res, next);
  });

  // PUT ${module_name}/:id
  // Update something.
  router.put('/:id', (req, res, next) => {
    controller.update(req, res, next);
  });

  // DELETE ${module_name}/:id
  // Delete something.
  router.delete('/:id', (req, res, next) => {
    controller.destroy(req, res, next);
  });
  
  return router;
}
