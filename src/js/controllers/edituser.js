app.controller('EditUserCtrl', ['$scope', '$location', '$routeParams', 'usersService', 'langService', 'logger', 'messagesService', function($scope, $location, $routeParams, usersService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		usersService.get($routeParams.email)
			
			.then(function (data){

				$scope.query = $routeParams.email;
				
				$scope.userExists = data.userExists;
				
				$scope.user = data.user;

				$scope.user.password = ''; 

				$scope.user.repeatPassword = '';
				
			}, function (error){

				console.log(error);
			
			});

		$scope.original = angular.copy($scope.user);


		$scope.cancelEdit = function(){

			$scope.user = angular.copy($scope.original);

			$location.path('/user/' + $routeParams.email);		
		
		};


		$scope.checkMatch = function() {
		
			if($scope.user) return $scope.user.password !== $scope.user.repeatPassword;
		
		}; 


		$scope.saveEditedUser = function(user){
			
			usersService.update($routeParams.email, user)
			
			.then(function (data){	

				if(data.error === 1) {
				
					logger.error("Couldn't update the user");
				
				} else {
				
					logger.success("User updated");

					langService.setLang(data.user.language);
				
					$location.path('/user/' + data.user.email);
				
				}
			
			}, function (error){
			
				console.log(error);
			
			});
		
		};		

		$scope.canSave = function(){
			
			if($scope.newUserForm.$valid && $scope.newUserForm.$dirty){
			
				return true;
			
			} else {
			
				return false;
			
			}
		
		};

	} else {

		logger.error('You need to login to edit a user');

		$location.path('/login');
	
	}

}]);