angular.module('PhatStatsApp', [
  'PhatStatsApp.controllers',
  'PhatStatsApp.services' ,
  'sportsTicker',
  'sportsTickerDemo',
  'angular-jqcloud',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/home", {templateUrl: "partials/home.html", controller: "phatStatsController"}).
	when("/home/:id", {templateUrl: "partials/player.html", controller: "playerController"}).
	otherwise({redirectTo: '/home'});
}]);