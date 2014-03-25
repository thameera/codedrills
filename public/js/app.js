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
    .when('/:lang/play', {
      templateUrl: 'play.html',
      controller: 'PlayCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

drillApp.controller('HomeCtrl', ['$scope', function($scope) {
  //
}]);

drillApp.controller('JSHomeCtrl', ['$scope', function($scope) {
  //
}]);

drillApp.controller('PyHomeCtrl', ['$scope', function($scope) {
  //
}]);

drillApp.controller('ScalaHomeCtrl', ['$scope', function($scope) {
  //
}]);

drillApp.controller('PlayCtrl', ['$scope', function($scope) {
  //
}]);

