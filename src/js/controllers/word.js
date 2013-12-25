app.controller('WordCtrl', ['$scope', '$routeParams', 'wordsService', function($scope, $routeParams, wordsService) {
	'use strict';
    
	console.log('word ctrl');
	console.log($routeParams.says);

	wordsService.get($routeParams.says)
		.then(function (data){
			console.log(data);
			$scope.word = data;
		}, function (error){
			console.log(error);
		});

}]);