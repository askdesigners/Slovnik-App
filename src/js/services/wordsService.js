app.factory('wordsService', ['$http', '$resource', '$q', function ($http, $resource, $q) {

	var wordsResource = $resource('words', 
		{}, 
		{ 'query' : {method: 'GET', isArray: false, cache: false} });

	var wordResource = $resource('word/:says', {says: '@says'},
		{
			'get': {method: 'GET', isArray: false, cache: true},
			'create': {method: 'PUT'},
			'update': {method: 'POST'},
			'remove': {method: 'DELETE'}
		});

	var factory = {
		query : function () {
			var deferred = $q.defer();
			wordsResource.query({},
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		get: function (says) {
			var deferred = $q.defer();
			wordResource.get({says: says},
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		create: function (payload) {
			var deferred = $q.defer();
			wordResource.create(payload,
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		update: function (says, payload) {
			var deferred = $q.defer();
			wordResource.update({says: says}, payload,
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		},
		removeWord : function (payload) {
			console.log('remove: '+ payload);
	
			var deferred = $q.defer();
			wordResource.remove({says: payload},
			function (resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		}
	};

	return factory;
	
}]);
