angular.module('PhatStatsApp.controllers', []).
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
});