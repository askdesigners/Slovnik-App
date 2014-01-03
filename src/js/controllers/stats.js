app.controller('StatsCtrl', ['$scope', '$location', 'statsService', 'langService', 'logger', function($scope, $location, statsService, langService, logger) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){

		statsService()
		
		.then(function (data){
			
			$scope.stats = data;
			
		}, function (error){

			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the stats page');

		$location.path('/login');

	}

}]);