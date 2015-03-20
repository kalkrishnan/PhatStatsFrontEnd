/*!
 * Angular jQCloud
 * For jQCloud 2 (https://github.com/mistic100/jQCloud) 
 * Copyright 2014 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */

angular.module('angular-jqcloud', []).directive('jqcloud', ['$parse', function($parse) {
  // get existing options
  var defaults = jQuery.fn.jQCloud.defaults.get(),
      jqcOptions = [];
  
  for (var opt in defaults) {
    if (defaults.hasOwnProperty(opt)) {
      jqcOptions.push(opt);
    }
  }
	console.log(jqcOptions);
  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    scope: {
      words: '=words'
    },
    link: function($scope, elem, $attr) {
      var options = {};
		console.log($attr);
      for (var i=0, l=jqcOptions.length; i<l; i++) {
        var opt = jqcOptions[i];
	
		
        if ($attr[opt.toLowerCase()] !== undefined) {
		    console.log(opt);
			console.log($attr[opt.toLowerCase()]);
          options[opt] = $parse($attr[opt.toLowerCase()])();
        }
      }
        console.log($scope.words);
		console.log(options);
		  console.log(elem);
		
      $(elem).jQCloud($scope.words, options);
      
      $scope.$watchCollection('words', function() {
        $scope.$evalAsync(function() {
          var words = [];
          $.extend(words,$scope.words);
          $(elem).jQCloud('update', words);
        });
      });
    
      $(elem).bind('$destroy', function() {
        $(elem).jQCloud('destroy');
      });
    }
  };
}]);
