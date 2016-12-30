var chai = require('chai')
var should = chai.should();
var expect = chai.expect;
var jsdom = require('jsdom');
var request = require('supertest');
var router = require('../index');
var app = require('express')();
var config = require('../../config');

app.use('/', router.router);
app.set('view engine', config.test.view_engine);

describe('Test Template Controller', () => {
  
  before(() => {
  });
  
  describe('Test basic', () => {
    it('Template#index', done => {
      request(app)
        .get('/')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('#index');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Template#index".should.equal("");
            done();
          }
        });
    });
    
    it('Template#new', done => {
      request(app)
        .get('/new')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('#new');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Template#new".should.equal("");
            done();
          }
        });
    });

    it('Template#edit', done => {
      request(app)
        .get('/1/edit')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('#edit');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Template#edit".should.equal("");
            done();
          }
        });
    });
  });
});
