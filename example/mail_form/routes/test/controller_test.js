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

describe('Test controller', () => {
  
  before(() => {
  });
  
  describe('Test basic', () => {
    it('Index', done => {
      request(app)
        .get('/')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('Index');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on #index".should.equal("");
            done();
          }
        });
    });
    
    it('New', done => {
      request(app)
        .get('/new')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('New');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on #new".should.equal("");
            done();
          }
        });
    });

    it('Edit', done => {
      request(app)
        .get('/1/edit')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('Edit');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on #edit".should.equal("");
            done();
          }
        });
    });
  });
});
