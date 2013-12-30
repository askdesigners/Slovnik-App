app.factory('statsService', ['$http', '$resource', '$q', function ($http, $resource, $q) {

	var statsResource = $resource('stats', 
		{}, 
		{ 'query' : {method: 'GET', isArray: false, cache: true} });

	var factory = function () {
		var deferred = $q.defer();
		statsResource.query({},
		function (resp) {
			deferred.resolve(resp);
		});
		return deferred.promise;
	};

	return factory;
	
}]);
