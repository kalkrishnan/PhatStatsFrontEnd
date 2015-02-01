angular.module('PhatStatsApp.services', []).
  factory('phatStatsAPIservice', function($http) {

    var playersAPI = {};

    playersAPI.getPlayers = function() {
      return $http({
         dataType: 'json', 
        url: 'http://localhost:4567/NFLPlayers'
      });
    }

    return playersAPI;
  });