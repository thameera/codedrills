'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'web.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      server: {
        src: ['*.js', 'routes/*.js']
      },
      js: {
        src: ['public/js/*.js'],
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'web.js',
          'routes/*.js',
          'routes/snippets/*.js'
        ],
        tasks: ['jshint:server', 'develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        tasks: ['jshint:js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['app/stylesheets/*.less'],
        options: {
          livereload: reloadPort
        }
      },
      jade: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['jshint', 'develop', 'watch']);
};
