app.factory('wordsService', ['$http', '$resource', '$q', function ($http, $resource, $q) {

	var wordsResource = $resource('words', 
		{}, 
		{ 'query' : {method: 'GET', isArray: false, cache: true} });

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
		create : function (payload) {
			console.log('create!');
			wordResource.create(payload, function(resp){
				console.log(resp);
			});
		},
		update : function (says, payload) {
			console.log('update: '+ says);
			console.log(payload);
			wordResource.update({says: says}, payload, function(resp){
				console.log(resp);
			});
		},
		remove : function (says) {
			console.log('remove: '+ says);
			wordResource.remove({says: says}, function(resp){
				console.log(resp);
			});
		}
	};

	return factory;
	
}]);
