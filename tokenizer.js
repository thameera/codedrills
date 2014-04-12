var fs = require('fs');

var inFile = process.argv[2] || 'code.txt';

fs.readFile(inFile, {encoding: 'utf-8'}, function(err, data) {
  if (err) {
    console.error('Error reading ' + inFile);
    return;
  }

  var snippets = data.split('\n\n');
  snippets.forEach(function(snippet) {
    var lines0 = snippet.split('\n');
    var lines = [];
    lines0.forEach(function(line) {
      lines.push(line.replace('  ', '\t'));
    });
    console.log(JSON.stringify(lines) + ',');
  });
});

