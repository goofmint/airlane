var should = chai.should();
var expect = chai.expect;
var router = require('../index');
var config = require('../../config');

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
          $("h1").text().should.equal('#index');
          done();
        })
        .end(err => {
          if (err) {
            "Test faild on Todo#index".should.equal("");
            done();
          }
        });
    });
    
    it('Todo#new', done => {
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
            "Test faild on Todo#new".should.equal("");
            done();
          }
        });
    });

    it('Todo#edit', done => {
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
            "Test faild on Todo#edit".should.equal("");
            done();
          }
        });
    });
  });
});
