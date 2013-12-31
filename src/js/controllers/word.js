app.controller('WordCtrl', ['$scope', '$routeParams', '$location', 'wordsService', 'logger', 'messagesService', function($scope, $routeParams, $location, wordsService, logger, messagesService) {
	'use strict';

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		$scope.deleting = false;

		wordsService.get($routeParams.says)
			
			.then(function (data){

				$scope.query = $routeParams.says;
				
				$scope.wordExists = data.wordExists;
				
				$scope.word = data.word;
				
			}, function (error){

				console.log(error);
			
			});

		$scope.edit = function(){

			$location.path('/edit/' + $routeParams.says);
		
		};

		$scope.showDelete = function(){

			$scope.deleting = true;

		};

		$scope.cancelDelete = function(){

			$scope.deleting = false;

		};

		$scope.deleteWord = function(){

			wordsService.removeWord($routeParams.says)

				.then(function (data){	

				if(data.error === 1) {
				
					logger.error($scope.messages["delete failed"]);
				
				} else {
				
					logger.success($scope.messages["word deleted"]);
				
					$location.path('/words');
				
				}
			
			}, function (error){
			
				console.log(error);
			
			});
		};

	} else {

		logger.error('You need to login to see the definition page');

		$location.path('/login');
	}

}]);