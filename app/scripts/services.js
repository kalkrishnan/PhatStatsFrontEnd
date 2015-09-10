angular.module('PhatStatsApp.services', []).
  factory('phatStatsAPIservice', function($http) {

    var playersAPI = {};

    playersAPI.getPlayers = function() {
      return $http({
         dataType: 'json', 
        url: 'http://localhost:8081/PhatStats-1.0/Service/Players'
      });
    }

    return playersAPI;
  }).
  factory('wordCloudService', function($http) {

    var playersAPI = {};

    playersAPI.getPlayers = function() {
      return $http({
         dataType: 'json', 
        url: 'http://localhost:8081/PhatStats-1.0/Service/Players'
      });
    }

    return playersAPI;
  });