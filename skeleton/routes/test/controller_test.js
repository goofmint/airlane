var chai    = require('chai');
var jsdom   = require('jsdom');
var request = require('supertest');
var app     = require('express')();
var should  = chai.should();
var expect  = chai.expect;
var router  = require('../index')(m);
var config = require('${"../".repeat(module_name.split("/").length + 1)}config');
app.use('/', router);
app.set('view engine', config.test.view_engine);

describe('Test ${controllerName} Controller', () => {
  
  before(() => {
  });
  
  describe('Test basic', () => {
    it('${controllerName}#index', done => {
      request(app)
        .get('/')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('${module_name}#index');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on ${controllerName}#index".should.equal("");
            done();
          }
        });
    });
    
    it('${controllerName}#new', done => {
      request(app)
        .get('/new')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('${module_name}#new');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on ${controllerName}#new".should.equal("");
            done();
          }
        });
    });

    it('${controllerName}#edit', done => {
      request(app)
        .get('/1/edit')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('${module_name}#edit');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on ${controllerName}#edit".should.equal("");
            done();
          }
        });
    });
  });
});
