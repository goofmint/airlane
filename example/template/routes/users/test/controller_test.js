var chai = require('chai')
var should = chai.should();
var expect = chai.expect;
var jsdom = require('jsdom');
var request = require('supertest');
var router = require('../index');
var app = require('express')();
var config = require('../../../config');

app.use('/', router.router);
app.set('view engine', config.test.view_engine);

describe('Test User Controller', () => {
  
  before(() => {
  });
  
  describe('Test basic', () => {
    it('User#index', done => {
      request(app)
        .get('/')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('users/#index');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on User#index".should.equal("");
            done();
          }
        });
    });
    
    it('User#new', done => {
      request(app)
        .get('/new')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('users/#new');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on User#new".should.equal("");
            done();
          }
        });
    });

    it('User#edit', done => {
      request(app)
        .get('/1/edit')
        .expect(res => {
          var document = jsdom.jsdom(res.text);
          var window = document.defaultView;
          var $ = require('jquery')(window);
          $("h1").text().should.equal('users/#edit');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on User#edit".should.equal("");
            done();
          }
        });
    });
  });
});
