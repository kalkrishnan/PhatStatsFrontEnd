'use strict';

var sportsTickerDemo = angular.module('sportsTickerDemo', ['sportsTicker']);

sportsTickerDemo.controller("TickerFeedCtrl", function($scope, $http){

    $http.get('http://localhost:4567/Latest').then(function(response){
        $scope.feed = response.data;
		
    });

});