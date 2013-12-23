app.controller('NewWordCtrl', ['$scope', 'wordsService', function($scope, wordsService) {
	'use strict';

    $scope.saveWord = function(word){
		wordsService.create(word);
    };

	$scope.canSave = function(){
		return true; // validate here
	};

}]);