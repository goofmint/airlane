var path = require('path');
require('set-node-path')(
  path.resolve(`${airlane_path}/node_modules`)
);
var chai    = require('chai');
var jsdom   = require('jsdom');
var request = require('supertest');
var app     = require('express')();
var should  = chai.should();
var expect  = chai.expect;
var router  = require('../index')(m);
var config  = require('../../config');
app.use('/', router);
app.set('view engine', config.test.view_engine);

describe('Test Todo Controller', () => {
  
  before(() => {
  });
  
  describe('Test basic', () => {
    it('Todo#index', done => {
      request(app)
        .get('/')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('Todo App');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Todo#index".should.equal("");
            done();
          }
        });
    });
  });
});
