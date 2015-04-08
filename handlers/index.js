'use strict';

var mongojs = require('mongojs');
var cipher = require('util-api-cipher');
var config = require('../config');
var db = mongojs(config.DB);
var journals = db.collection('journals');

function handleReply(err, data, request, reply) {
  if (err) {
    reply(err);
  } else {
    reply(data);
  }
}

function getLatestJournalDate(cb) {
  journals.find().sort({'JOURNPOST_OJ.JP_JDATO':-1}).limit(1, function(err, data) {
    if (err) {
      return cb(err, null);
    } else {
      if (data) {
        return cb(null, {date: data[0].JOURNPOST_OJ.JP_JDATO});
      } else {
        return cb(null, data);
      }
    }
  });
}

function getJournals(request, reply) {
  var skipNum = request.query.skip ? parseInt(request.query.skip, 10):0;
  var limitNum = request.query.limit ? parseInt(request.query.limit, 10):20;
  journals.find({}).skip(skipNum).limit(limitNum, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournalsByDate(request, reply) {
  var journalDate = parseInt(request.params.date, 10);

  journals.find({'JOURNPOST_OJ.JP_JDATO':journalDate}, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournalsByDateRange(request, reply) {
  var fromDate = parseInt(request.params.fromDate, 10);
  var toDate = parseInt(request.params.toDate, 10);

  journals.find({'JOURNPOST_OJ.JP_JDATO':{ '$gte': fromDate, '$lte': toDate }}, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournalsByDepartmentDistinct(request, reply) {
  journals.distinct('JOURNPOST_OJ.JP_ANSVAVD', function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournalsByDepartment(request, reply) {
  var department = cipher.decrypt(request.params.department);
  var q = {'JOURNPOST_OJ.JP_ANSVAVD':department};

  if (request.query.date) {
    var journalDate = parseInt(request.query.date, 10);
    q['JOURNPOST_OJ.JP_JDATO'] = journalDate;
  }

  journals.find(q, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournalsDatesDistinct(request, reply) {
  journals.distinct('JOURNPOST_OJ.JP_JDATO', function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournalsCollection(request, reply) {
  var saSeknr = parseInt(request.params.saSeknr, 10);
  journals.find({'SA_SEKNR':saSeknr}, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getJournal(request, reply) {
  var jpSeknr = parseInt(request.params.jpSeknr, 10);
  journals.find({'JOURNPOST_OJ.JP_SEKNR':jpSeknr}, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

function getLatestJournals(request, reply) {
  getLatestJournalDate(function(error, date) {
    if (error) {
      reply(error);
    } else {
      if (date.date) {
        var journalDate = parseInt(date.date, 10);
        journals.find({'JOURNPOST_OJ.JP_JDATO':journalDate}, function(err, data) {
          handleReply(err, data, request, reply);
        });
      } else {
        reply([]);
      }
    }
  });
}

function searchJournals(request, reply) {
  journals.find({'$text':{'$search':request.params.searchText}}, function(err, data) {
    handleReply(err, data, request, reply);
  });
}

module.exports.getJournals = getJournals;

module.exports.getJournalsByDate = getJournalsByDate;

module.exports.getJournalsByDateRange = getJournalsByDateRange;

module.exports.getJournalsDatesDistinct = getJournalsDatesDistinct;

module.exports.getJournalsByDepartment = getJournalsByDepartment;

module.exports.getJournalsByDepartmentDistinct = getJournalsByDepartmentDistinct;

module.exports.getJournalsCollection = getJournalsCollection;

module.exports.getJournal = getJournal;

module.exports.getLatestJournals = getLatestJournals;

module.exports.searchJournals = searchJournals;
