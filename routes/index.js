
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('layout');
};

exports.bin = function(req, res) {
  res.render('bin');
};

