var drillApp = angular.module('drillApp', ['ngRoute']);

drillApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
}]);

drillApp.service('CommService', ['$http', function($http) {
  this.fetchSnippets = function(lang, cat, cb) {
    $http.get('snippets/' + lang + '/' + cat).success(cb);
  };
}]);

drillApp.service('UtilService', [function() {
  this.getRandomSnippet = function(snippets) {
    var r = Math.floor(Math.random() * snippets.length);
    return snippets[r];
  };
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
  $scope.snippets = [];
  $scope.curSnippet = '';
  $scope.lang = $routeParams.lang;
  $scope.cat = $routeParams.cat;

  Comm.fetchSnippets($scope.lang, $scope.cat, function(data) {
    $scope.snippets = data;
    $scope.curSnippet = Util.getRandomSnippet($scope.snippets);
  });
}]);

