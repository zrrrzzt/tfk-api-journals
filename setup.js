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
var setupCounter = 0;
var setupJobs = 3;

function isSetupFinished(){
  setupCounter++;
  if (setupCounter === setupJobs) {
    console.log('Setup finished!');
    process.exit();
  }
}

function handleCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log('Action performed');
    console.log(data);
    isSetupFinished();
  }
}

function addDocument(options, callback) {
  var collection = db.collection(options.collection);
  var document = options.document;
  document._id = mongojs.ObjectId(document._id);

  collection.insert(document, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, data);
    }
  });
}

journals.ensureIndex(textIndexFields, {'default_language': 'nb'}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log('TextIndex OK');
    console.log(data)
    isSetupFinished();
  }
});

journals.ensureIndex({'JOURNPOST_OJ.JP_JDATO': 1}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log('Index OK');
    console.log(data);
    isSetupFinished();
  }
});

addDocument({collection:'journals', document:journalsDocument}, handleCallback);
