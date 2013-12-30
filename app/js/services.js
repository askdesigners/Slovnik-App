/*! Slovnik - v - 2013-12-30
 * http://www.tellmesomethingnice.com
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
			"alreadyRegistered": " is already registered!",
			"word saved": "Yay! The word was added to the dictionary!",
			"word lost": "Well that sucks. The word wasn't saved. :/",
			"delete failed":"The word was not deleted",
			"word deleted":"The word was deleted!"			
		}
	}
});

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
