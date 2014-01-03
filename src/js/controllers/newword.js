app.controller('NewWordCtrl', ['$scope', '$location', 'wordsService', 'langService', 'logger', 'messagesService', function($scope, $location, wordsService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();
	
	if($scope.isLoggedIn === true){

		$scope.messages = messagesService.messages; 

		$scope.saveWord = function(word){
			
			wordsService.create(word)
			
			.then(function (data){	

				if(data.error === 1) {
				
					logger.error($scope.messages["word lost"]);
				
				} else {
				
					logger.success($scope.messages["word saved"]);
				
					$location.path('/words');
				
				}
			
			}, function (error){
			
				console.log(error);
			
			});
		
		};	

		$scope.cancelCreate = function(){

			$scope.word = {};

			$location.path('/words');		
		
		};	

		$scope.canSave = function(){
			
			if($scope.newWordForm.$valid && $scope.newWordForm.$dirty){
			
				return true;
			
			} else {
			
				return false;
			
			}
		
		};

	} else {

		logger.error('You need to login to create a word');

		$location.path('/login');

	}

}]);