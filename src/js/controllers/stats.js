app.controller('StatsCtrl', ['$scope', '$location', 'statsService', function($scope, $location, statsService) {
	'use strict';

	statsService.query()
		
		.then(function (data){
			
			$scope.stats = data;
			
		}, function (error){

			console.log(error);
		
		});

}]);