app.controller('WordsCtrl', ['$scope', 'wordsService', function($scope, wordsService) {
	'use strict';
	$scope.message = "Message from words Controller";

	$scope.wordsList = wordsService.query()
	.then(function (data){
		return data;
	}, function (error){
		console.log(error);
	});
}]);