/*! meanseed - v0.0.1 - 2013-12-23
 * tellmesomethingnice.com
 * Copyright (c) 2013 Ryan Cole;
 * Licensed 
 */
app.factory('messagesService', function() {
	'use strict';
	return {
		messages: {
			"Bad Password" : "Login Failed. Incorrect user or password. Please try again.",
			"login": "I want to login instead",
			"register": "I'm not registered!",
			"registerSuccess": " was created successfully",
			"alreadyRegistered": " is already registered!"			
		}
	}
});

app.factory('wordsService', ['$http', '$resource', '$q', function ($http, $resource, $q) {

	var wordsResource = $resource('words', 
		{}, 
		{ 'list' : {method: 'GET', isArray: false, timeout: 2000, responseType: "json"} });

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
			wordsResource.list({},
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
