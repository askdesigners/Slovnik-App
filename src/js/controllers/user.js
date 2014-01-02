app.controller('UserCtrl', ['$scope', '$routeParams', '$location', 'usersService', 'logger', 'messagesService', function($scope, $routeParams, $location, usersService, logger, messagesService) {
	'use strict';

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		$scope.deleting = false;

		console.log($routeParams.email);

		usersService.get($routeParams.email)
			
			.then(function (data){

				console.log(data);

				$scope.query = $routeParams.email;
				
				$scope.userExists = data.userExists;
				
				$scope.user = data.user;

			}, function (error){

				console.log(error);
			
			});

		$scope.edit = function(){

			$location.path('/edituser/' + $routeParams.email);
		
		};

		$scope.showDelete = function(){

			$scope.deleting = true;

		};

		$scope.cancelDelete = function(){

			$scope.deleting = false;

		};

		$scope.deleteUser = function(){

			usersService.removeUser($routeParams.email)

				.then(function (data){	

				if(data.error === 1) {
				
					logger.error("The user couldn't be deleted!");
				
				} else {
				
					logger.success("The user was deleted!");
				
					$location.path('/users');
				
				}
			
			}, function (error){
			
				console.log(error);
			
			});
		};

	} else {

		logger.error('You need to login to see a users profile');

		$location.path('/login');
	}

}]);