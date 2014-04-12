module.exports = {
  basics: [
    ["var age = 25;"],
    ["var sum = 3 + 4;"],
    ["var a = 3, b = 4;", "var c = a * b;"],
    ["var msg = 'Hello';", "alert(msg);"],
    ["var s = '18';", "var i = Number(s) + 5;"],
    ["var i = 4;", "i += 2;"],
    ["var separator = separator || '_';"],
    ["console.log('Hello there');"],
    ["var isOne = (num === 1);"],
    ["var b = true;", "var c = false;"],
    ["var x = 25;", "console.debug(typeof x);"]
  ],

  control: [
    ["if (age < 30) {","\tconsole.log('Young');","} else {","\tconsole.log('Old');","}"],
    ["if (num % 2 === 0) {","\tconsole.log('Even number');","}"],
    ["if (!arg) {","\tconsole.error('No argument found');","}"],
    ["if (!s.condition || s.condition()) {","\tloadScript(s);","}"],
    ["if (typeof arg === 'number') {","\treturn arg * arg;","}"],
    ["for (var counter = 0; counter < 10; counter += 1) {","\tconsole.log(counter * 2);","}"],
    ["for (var current = 0; ; current += 1) {","\tif (current === 20) break;","\tconsole.log(current);","}"],
    ["for (var i in b) {","\ta[i] = b[i];","}"],
    ["var num = 20;","while (num > 0) {","\tconsole.log(num);","\tnum -= 1;","}"],
    ["do {","\telement = element.nextSibling;","\tif (!element) break;","\telements.push(element);","} while (element !== endNode);"],
    ["while (available) {","\tconsole.log('Yes');","\tavailable = getNext();","}"],
  ],

  functions: [
    ["function add(a, b) {","\treturn a + b;","}"],
    ["var print = function(msg) {","\tconsole.log(msg);","};"],
    ["function int(str) {","\treturn parseInt(str, 10);","}"],
    ["var noop = function() {};"],
    ["function isUndefined(value) {","\treturn typeof value === 'undefined';","}"],
    ["function isLeafNode (node) {","\tif (node) {","\t  return true;","\t}","\treturn false;","}"],
  ]
};

