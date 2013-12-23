app.controller('WordsCtrl', ['$scope', 'wordsService', function($scope, wordsService) {
	'use strict';

	$scope.wordsList = wordsService.query()
	.then(function (data){
		return data.words;
	}, function (error){
		console.log(error);
	});

	$scope.wordsExist = function(){
		return $scope.wordsList.wordCount > 0;
	};

}]);