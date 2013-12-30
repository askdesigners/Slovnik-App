app.controller('StatsCtrl', ['$scope', '$location', 'statsService', function($scope, $location, statsService) {
	'use strict';

	statsService()
		
		.then(function (data){
			
			console.log(data);

			$scope.stats = data;
			
		}, function (error){

			console.log(error);
		
		});

}]);