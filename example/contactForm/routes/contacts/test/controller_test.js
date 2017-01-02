var path = require('path');
require('set-node-path')(
  path.resolve(airlane_path + "/node_modules")
);
var chai    = require('chai');
var jsdom   = require('jsdom');
var request = require('supertest');
var app     = require('express')();
var should  = chai.should();
var expect  = chai.expect;
var router  = require('../index')(m);
var config = require('../../../config');
app.use('/', router);
app.set('view engine', config.test.view_engine);

describe('Test Contact Controller', () => {
  
  before(() => {
  });
  
  describe('Test basic', () => {
    it('Contact#index', done => {
      request(app)
        .get('/')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('contacts/#index');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Contact#index".should.equal("");
            done();
          }
        });
    });
    
    it('Contact#new', done => {
      request(app)
        .get('/new')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('contacts/#new');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Contact#new".should.equal("");
            done();
          }
        });
    });

    it('Contact#edit', done => {
      request(app)
        .get('/1/edit')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('contacts/#edit');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Contact#edit".should.equal("");
            done();
          }
        });
    });
  });
});
