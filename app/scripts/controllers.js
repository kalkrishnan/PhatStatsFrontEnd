angular.module('PhatStatsApp.controllers', ['angular-jqcloud']).
controller('phatStatsController', function($scope, phatStatsAPIservice) {

$scope.search = function() {
    
    $scope.playersList = [];
	$scope.searchFilter = function (player) {
    var keyword = new RegExp($scope.keywords, 'i');
	
    return !$scope.keywords || keyword.test(player.displayName);
}	;

    phatStatsAPIservice.getPlayers().success(function (response) {
	
        $scope.playersList = response.Players;
    });
	};
	 
   angular.element(document).ready(function() {$('.multiple-items').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000,
		 slidesToShow: 1,
	 img: true,
	 infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'

	});});
	
		  

}).
controller('playerController', function($scope,  $routeParams, phatStatsAPIservice, $http) {

	$scope.id = $routeParams.id;
	id = $scope.id.split(" ");

	
	image= "images/"+$scope.id.replace(/\s/g, '')+".jpg";

	$("#playerImage").attr("src",image);
	
	
});

