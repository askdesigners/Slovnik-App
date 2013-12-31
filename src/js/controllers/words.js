app.controller('WordsCtrl', ['$scope', '$location', 'wordsService', 'logger', function($scope, $location, wordsService, logger) {
	'use strict';

	if($scope.isLoggedIn === true){

		wordsService.query()
			
		.then(function (data){
			
			$scope.wordsExist = (data.wordCount > 0) ? true : false;
		
			$scope.wordsList = data.words;
		
		}, function (error){
		
			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the words list');

		$location.path('/login');
	}

}]);