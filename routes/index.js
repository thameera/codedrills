'use strict';

var db = {};

db.javascript = require('./snippets/js');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('layout');
};


/*
 * GET code snippets
 */

exports.snippets = function(req, res) {
  var lang = req.params.lang,
      cat = req.params.cat;

  if (db[lang]) {
    res.json(db[lang][cat] || []);
  } else {
    res.json([]);
  }
};

