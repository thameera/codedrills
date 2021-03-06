'use strict';

var drillApp = angular.module('drillApp', ['ngRoute', 'hljs']);

drillApp.config(['$locationProvider', '$routeProvider', 'hljsServiceProvider', function($locationProvider, $routeProvider, hljsServiceProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .when('/javascript', {
      templateUrl: 'javascript.html',
      controller: 'JSHomeCtrl'
    })
    .when('/python', {
      templateUrl: 'python.html',
      controller: 'PyHomeCtrl'
    })
    .when('/scala', {
      templateUrl: 'scala.html',
      controller: 'ScalaHomeCtrl'
    })
    .when('/:lang/p/:cat', {
      templateUrl: 'play.html',
      controller: 'PlayCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    hljsServiceProvider.setOptions({
      tabReplace: '    '
    });
}]);

drillApp.service('CommService', ['$http', function($http) {
  this.fetchSnippets = function(lang, cat, cb) {
    $http.get('/snippets/' + lang + '/' + cat).success(cb);
  };
}]);

drillApp.service('UtilService', [function() {
}]);

drillApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.languages = [
    {link: 'javascript', title: 'Javascript'},
    {link: 'python', title: 'Python'},
    {link: 'scala', title: 'Scala'}
  ];
}]);

drillApp.controller('JSHomeCtrl', ['$scope', function($scope) {
  $scope.categories = [
    {cat: 'basics', title: 'Basics'},
    {cat: 'control', title: 'Control Structures'},
    {cat: 'functions', title: 'Functions'},
    {cat: 'strings', title: 'Strings'},
    {cat: 'arrays', title: 'Arrays'},
    {cat: 'classes', title: 'Classes'},
    {cat: 'jsonmath', title: 'JSON, Math'},
    {cat: 'dom', title: 'DOM'},
    {cat: 'es6', title: 'ES6'},
    {cat: 'jquery', title: 'jQuery'},
    {cat: 'lodash', title: 'Lo-dash'},
  ];
}]);

drillApp.controller('PyHomeCtrl', ['$scope', function($scope) {
  //
}]);

drillApp.controller('ScalaHomeCtrl', ['$scope', function($scope) {
  //
}]);

drillApp.controller('PlayCtrl', ['$scope', '$routeParams', 'CommService', 'UtilService', function($scope, $routeParams, Comm, Util) {
  var curSnipIndex, 
      snippets = [];

  $scope.curSnippet = '';
  $scope.lang = $routeParams.lang;
  $scope.cat = $routeParams.cat;
  $scope.comingsoon = false;

  /*
   * Increment the current snippet index
   */
  var getNextSnipIndex = function() {
    curSnipIndex += 1;
    if (curSnipIndex === snippets.length) {
      curSnipIndex = 0;
    }
    return curSnipIndex;
  };

  /*
   * Proceed to next line or snippet
   */
  var proceed = function() {
    if ($scope.curLine === $scope.curSnippet.length - 1) {
      curSnipIndex = getNextSnipIndex();
      $scope.curSnippet = snippets[curSnipIndex];
      $scope.curLine = 0;
    } else {
      $scope.curLine += 1;
    }
    $scope.input = '';
  };

  $scope.onKeyPress = function(e) {
    // TODO: remove (for testing only)
    if (e.which === 96) {  // Tilde
      e.preventDefault();
      $scope.input = '';
      proceed();
    }
    if (e.which === 13) { // Enter pressed
      if ($scope.input === $scope.curSnippet[$scope.curLine].replace(/\t/g, '').trim()) {
        //console.log('yes');
        proceed();
      } else {
        //console.log('no');
      }
    }
  };

  Comm.fetchSnippets($scope.lang, $scope.cat, function(data) {
    if (_.isEmpty(data)) {
      $scope.comingsoon = true;
    }
    snippets = _.shuffle(data);
    curSnipIndex = 0;
    $scope.curSnippet = snippets[0];
    $scope.curLine = 0;
  });
}]);

