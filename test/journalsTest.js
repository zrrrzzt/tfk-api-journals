'use strict';

var request = require('supertest');
var cipher = require('util-api-cipher');
var server = require('../server');
var config = require('../config');

request = request('http://localhost:' + config.SERVER_PORT);

describe('Server journals', function() {

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  describe('GET /journals', function() {
    it('respond with json', function(done) {
      request
        .get('/journals')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/date/distinct', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/date/distinct')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/date/20150330', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/date/20150330')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/date/20150330/20150330', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/date/20150330/20150330')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/department/distinct', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/department/distinct')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/department/Team kulturminnevern', function() {
    it('respond with json', function(done) {
      var department = cipher.encrypt('Team kulturminnevern');
      request
        .get('/journals/department/' + department)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/department/Team kulturminnevern?date=20150330', function() {
    it('respond with json', function(done) {
      var department = cipher.encrypt('Team kulturminnevern');
      request
        .get('/journals/department/' + department + '?date=20150330')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/collection/1325', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/collection/1325')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/latest', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/latest')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journal/5523d026b8eaac411a8b4598', function() {
    it('respond with json', function(done) {
      request
        .get('/journal/5523d026b8eaac411a8b4598')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /journals/riksantikvaren', function() {
    it('respond with json', function(done) {
      request
        .get('/journals/forslag')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});
