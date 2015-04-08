'use strict';

var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.DB);
var journals = db.collection('journals');
var journalsDocument = require('./test/data/journals.json');
var textIndexFields = {
  'SA_OFFTITTEL': 'text',
  'JOURNPOST_OJ.JP_OFFINNHOLD': 'text'
};

function handleCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}

function addDocument(options, callback) {
  var collection = db.collection(options.collection);

  collection.insert(options.document, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, data);
    }
  });
}

db.createCollection('journals', handleCallback);

journals.ensureIndex(textIndexFields, {'default_language': 'nb'}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log(data)
  }
});

db.journals.ensureIndex({'JOURNPOST_OJ.JP_JDATO': 1}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log(data)
  }
});

addDocument({collection:'journals', document:journalsDocument}, handleCallback);
