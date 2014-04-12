'use strict';

/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    lessMiddleware = require('less-middleware');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(lessMiddleware({
    src: __dirname + '/app/stylesheets', 
    dest: __dirname + '/public/css',
    prefix: '/css',
    compress: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.locals.pretty = true;

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/snippets/:lang(|javascript|python|scala)?/:cat', routes.snippets);

app.get('/:lang(|javascript|python|scala)?/p/*', routes.index);
app.get('/:lang(|javascript|python|scala)?', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

