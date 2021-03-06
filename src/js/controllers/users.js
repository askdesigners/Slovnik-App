app.controller('UsersCtrl', ['$scope', '$location', 'usersService', 'langService', 'logger', function($scope, $location, usersService, langService, logger) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){

		usersService.query()
			
		.then(function (data){
			
			$scope.usersExist = (data.userCount > 0) ? true : false;
		
			$scope.usersList = data.users;
		
		}, function (error){
		
			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the users list');

		$location.path('/login');
	}

}]);