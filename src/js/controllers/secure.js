app.controller('SecureCtrl', ['$scope', function($scope){
	'use strict';
	$scope.message = "Message from Secure Controller";
	console.log('SecureCtrl');
}]);


app.controller('UnsecureCtrl', ['$scope', function($scope){
	'use strict';
	$scope.message = "Message from Unsecure Controller";
	console.log('UnsecureCtrl');
}]);