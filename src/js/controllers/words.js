app.controller('WordsCtrl', ['$scope', 'wordsService', function($scope, wordsService) {
	'use strict';

	wordsService.query()
		
	.then(function (data){
		
		$scope.wordsExist = (data.wordCount > 0) ? true : false;
	
		$scope.wordsList = data.words;
	
	}, function (error){
	
		console.log(error);
	
	});

}]);