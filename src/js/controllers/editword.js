app.controller('EditWordCtrl', ['$scope', '$location', '$routeParams', 'wordsService', 'logger', 'messagesService', function($scope, $location, $routeParams, wordsService, logger, messagesService) {
	'use strict';
	
	$scope.messages = messagesService.messages; 

	wordsService.get($routeParams.says)
		
		.then(function (data){

			$scope.query = $routeParams.says;
			
			$scope.wordExists = data.wordExists;
			
			$scope.word = data.word;
			
		}, function (error){

			console.log(error);
		
		});

	$scope.original = angular.copy($scope.word);

	$scope.cancelEdit = function(){

		$scope.word = angular.copy($scope.original);

		$location.path('/word/' + $routeParams.says);		
	
	};

    $scope.saveEditedWord = function(word){

		word.addedby = $scope.email;
		console.log($scope.email);
		
		wordsService.update($routeParams.says, word)
		
		.then(function (data){	

			if(data.error === 1) {
            
                logger.error($scope.messages["word lost"]);
            
            } else {
            
                logger.success($scope.messages["word saved"]);
            
                $location.path('/word/' + data.word.says);
            
            }
		
		}, function (error){
		
			console.log(error);
		
		});
    
    };		

	$scope.canSave = function(){
		
		if($scope.newWordForm.$valid && $scope.newWordForm.$dirty){
		
			return true;
		
		} else {
		
			return false;
		
		}
	
	};

}]);