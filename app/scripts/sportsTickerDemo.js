'use strict';

var sportsTickerDemo = angular.module('sportsTickerDemo', ['sportsTicker']);

sportsTickerDemo.controller("TickerFeedCtrl", function($scope, $http){


	
  $scope.colors = ["#16d6d6", "#14CBCB", "#12B6B6", "#0E9898", "#0C8B8B", "#0A7575", "#085F5F", "#064B4B", "#033030"];
	
	if($scope.id)
	{	
		console.log("getting latest player");
		var url = 'http://localhost:8081/PhatStats-1.0/Service/LatestPlayer?playerName='.concat($scope.id);
		console.log(url);
			$http.get(url).then(function(response){
			$scope.feed = response.data;
			
			
		});
		
			url = 'http://localhost:8081/PhatStats-1.0/Service/PlayerWordCount?playerName='.concat($scope.id);
			console.log(url);
			$http.get(url).then(function(response){
			$scope.words = response.data;
				console.log("in word count");
			console.log($scope.words);
		});
		
		
		
		url='http://localhost:8081/PhatStats-1.0/Service/PlayerInfo?playerName='.concat(id[0]+"-"+id[1])
		$http.get(url).then(function(response){
		
			console.log(response);
			$scope.info = response.data;
			$("#playerImage").attr("src",$scope.info["image"]);
			var i=0;
			for (var key in $scope.info) {
					  
					  var val = $scope.info[key];
					  $("#stat"+i).html(key);
					  $("#val"+i++).html(val);
					   if (i === 5) { break; }
					  			
			}
		
			console.log($scope.info["REC"]);
		});	

	}else
	{
	
	
		$http.get('http://localhost:8081/PhatStats-1.0/Service/Latest').then(function(response){
			$scope.feed = response.data;
			
		});
		}
	
});