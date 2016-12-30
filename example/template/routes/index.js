var express = require('express');
var router = express.Router();
var controller = require('./controller')

// Every methods go through this function.
// You can use it for before filter like checking authentication.
router.all('*',  (req, res, next) => {
  controller.all(req, res, next);
});

// GET /
// Show index page
router.get('/', (req, res, next) => {
  controller.index(req, res, next);
});

// GET /new
// Show create page
router.get('/new', (req, res, next) => {
  controller.new(req, res, next);
});

// POST 
// Create something.
router.post('/', (req, res, next) => {
  controller.create(req, res, next);
});

// GET /:id/edit
// Show edit page
router.get('/:id/edit', (req, res, next) => {
  controller.edit(req, res, next);
});

// PUT /:id
// Update something.
router.put('/:id', (req, res, next) => {
  controller.update(req, res, next);
});

// DELETE /:id
// Delete something.
router.delete('/:id', (req, res, next) => {
  controller.destroy(req, res, next);
});

// Return with router key.
module.exports = {
  router: router
};
