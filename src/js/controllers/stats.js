app.controller('StatsCtrl', ['$scope', '$location', 'statsService', 'logger', function($scope, $location, statsService, logger) {
	'use strict';

	if($scope.isLoggedIn === true){

		statsService()
		
		.then(function (data){
			
			console.log(data);

			$scope.stats = data;
			
		}, function (error){

			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the stats page');

		$location.path('/login');

	}

}]);