var app= angular.module('memoryApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider,$routeParam){

  $routeProvider
  .when('/', {
    templateUrl: 'partials/home-tpl.html',
    controller: 'homeCtrl'
  })
  .when('/memory/:type/:level', {
    templateUrl: 'partials/memory-tpl.html',
    controller: 'memoryCtrl'
  })
  .when('/score', {
    templateUrl: 'partials/score-tpl.html',
    controller: 'scoreCtrl'
  })
  .otherwise({ redirectTo: '/' });

}]);
