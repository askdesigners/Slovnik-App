app.factory('usersService', ['$http', '$resource', '$q', function ($http, $resource, $q) {

	var usersResource = $resource('users', 
		{}, 
		{ 'query' : {method: 'GET', isArray: false, cache: false} });

	var userResource = $resource('user/:email', {email: '@email'},
		{
			'get': {method: 'GET', isArray: false, cache: false},
			'create': {method: 'PUT'},
			'update': {method: 'POST'},
			'remove': {method: 'DELETE'}
		});

	var factory = {
		query : function () {
			var deferred = $q.defer();
			usersResource.query({},
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		get: function (email) {
			var deferred = $q.defer();
			userResource.get({email : email},
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		create: function (payload) {
			var deferred = $q.defer();
			userResource.create(payload,
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		update: function (email, payload) {
			var deferred = $q.defer();
			userResource.update({email : email}, payload,
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		removeUser : function (payload) {
			// console.log('remove: '+ payload);
	
			var deferred = $q.defer();
			userResource.remove({email: payload},
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		}
	};

	return factory;
	
}]);
