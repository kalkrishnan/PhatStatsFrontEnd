'use strict';

var sportsTickerDemo = angular.module('sportsTickerDemo', ['sportsTicker']);

sportsTickerDemo.controller("TickerFeedCtrl", function($scope, $http){


	
  $scope.colors = ["#16d6d6", "#14CBCB", "#12B6B6", "#0E9898", "#0C8B8B", "#0A7575", "#085F5F", "#064B4B", "#033030"];
	
	if($scope.id)
	{		var url = 'http://localhost:4567/LatestPlayer?playerName='.concat($scope.id);
			$http.get(url).then(function(response){
			$scope.feed = response.data;
			
		});
		
			url = 'http://localhost:4567/PlayerWordCount?playerName='.concat($scope.id);
			$http.get(url).then(function(response){
			$scope.words = response.data;
			
		});
		
		url='http://localhost:4567/PlayerInfo?playerName='.concat(id[0]+"-"+id[1])
		$http.get(url).then(function(response){
		console.log("in player info");
			console.log(response);
			$scope.info = response.data;
			$("#playerImage").attr("src",$scope.info["image"]);
	
			$("#val1").html($scope.info["REC"]);
			$("#val2").html($scope.info["YDS"]);
			$("#val3").html($scope.info["TD"]);
			$("#val4").html($scope.info["AVG"]);
			$("#val5").html($scope.info["LONG"]);
		
			console.log($scope.info["REC"]);
		});	

	}else
	{
	
	
		$http.get('http://localhost:4567/Latest').then(function(response){
			$scope.feed = response.data;
			
		});
		}
	
});