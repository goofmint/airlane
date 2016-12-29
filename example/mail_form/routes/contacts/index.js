var express = require('express');
var router = express.Router();
var controller = require('./controller')

// Every methods go through this function.
// You can use it for before filter like checking authentication.
router.all('*',  (req, res, next) => {
  controller.all(req, res, next);
});

// GET contacts/
// Show index page
router.get('/', (req, res, next) => {
  controller.index(req, res, next);
});

// GET contacts/new
// Show create page
router.get('/new', (req, res, next) => {
  controller.new(req, res, next);
});

// POST contacts
// Create something.
router.post('*', (req, res, next) => {
  controller.create(req, res, next);
});

// GET contacts/:id/edit
// Show edit page
router.get('/:id/edit', (req, res, next) => {
  controller.edit(req, res, next);
});

// PUT contacts/:id
// Update something.
router.put('/:id', (req, res, next) => {
  controller.update(req, res, next);
});

// DELETE contacts/:id
// Delete something.
router.delete('/:id', (req, res, next) => {
  controller.destroy(req, res, next);
});

// Return with router key.
module.exports = {
  router: router
};
