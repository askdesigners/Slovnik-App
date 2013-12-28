app.controller('NewWordCtrl', ['$scope', '$location', 'wordsService', 'logger', 'messagesService', function($scope, $location, wordsService, logger, messagesService) {
	'use strict';
	
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

	$scope.canSave = function(){
		
		if($scope.newWordForm.$valid && $scope.newWordForm.$dirty){
		
			return true;
		
		} else {
		
			return false;
		
		}
	
	};

}]);