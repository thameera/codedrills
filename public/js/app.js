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
  //
}]);

drillApp.controller('JSHomeCtrl', ['$scope', function($scope) {
  $scope.categories = [
    {cat: 'basics', title: 'Basics'},
    {cat: 'controlstructures', title: 'Control Structures'},
    {cat: 'strings', title: 'Strings'},
    {cat: 'arrays', title: 'Arrays'},
    {cat: 'functions', title: 'Functions'},
    {cat: 'json', title: 'JSON'},
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
    if (e.which === 13) { // Enter pressed
      if ($scope.input === $scope.curSnippet[$scope.curLine]) {
        console.log('yes');
        proceed();
      } else {
        console.log('no');
      }
    }
  };

  Comm.fetchSnippets($scope.lang, $scope.cat, function(data) {
    console.debug(data);

    snippets = _.shuffle(data);
    curSnipIndex = 0;
    $scope.curSnippet = snippets[0];
    console.debug($scope.curSnippet);
    $scope.curLine = 0;
  });
}]);

