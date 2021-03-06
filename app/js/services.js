/*! Slovnik - v - 2014-01-03
 * http://www.tellmesomethingnice.com
 * Copyright (c) 2014 Ryan Cole;
 * Licensed 
 */
app.factory('langService', function() {
	'use strict';

	var observerCallbacks = [],

	//call this when you know 'foo' has been changed
	notifyObservers = function(){
		
		angular.forEach(observerCallbacks, function(callback){
		
			callback();
		
		});
	
	},

	setLang = function(l){
	
		factory.lang = l;

		notifyObservers();
	
	},

	language = function(){
	
		return factory.slovnik[factory.lang];

	},

	factory = {

		//register an observer from a controller
		registerObserverCallback : function(callback){
		
			observerCallbacks.push(callback);
		
		},
		
		lang : "en",
		
		setLang : setLang,
		
		language : language,
		
		slovnik: {
		
			en: {
				msNoWords: "There are no words yet!",
				msNoWord: "is not in the dictionary.",
				msNoUser: "is not a user.",
				msNoMatch: "Passwords do not match!",
				uiLanguage: "Language",
				btnWords: "All words",
				btnAdd: "Add a word",
				btnStats: "Stats",
				btnUsers: "Users",
				btnSignInUp: "Signup/in",
				btnWhatIs: "What's this?",
				btnViewUsers: "View all users",
				uiLoggedInAs: "Logged in as",
				uiNotLoggedIn: "You're not logged in",
				btnLogout: "Logout",
				wordSays: "When Ollie says",
				wordMeans: "He means",
				wordTrans: "Which translates from Czech as ",
				formEditWord: "Edit word",
				formDeleteWord: "Delete word",
				formDeleteIt: "Delete it!",
				formLangSet: "Language",
				formEmail: "Email",
				formEditUser: "Edit user",
				formDeleteUser: "Delete user",
				formCancel: "Cancel",
				formSays: "Ollie says",
				formMeans: "It means",
				formLang: "He says it in",
				formTrans: "It translates to",
				more: "More",
				formCancelEdit: "Cancel edit",
				formSave: "Save",
				formSignin: "Sign in",
				formPassword: "Password",
				formPasswordAgain: "Password again",
				formPasswordMessage: "(leave blank to keep old password)",
				formRemember: "Remember me",
				formSubmit: "Submit",
				statsNumber: "Number of words",
				english: "English",
				czech: "Czech",
				words: "Words",
				statsThereAre: "There are",
				statsUsers: "users",
				uiNotSigned: "You are not signed in",
				btnNotReg: "I'm not registered",
				btnLoginInstead: "I want to login instead",
				aboutTitle: "This is a little app to help Grandma and Papaw understand their Eurotoddler.",
				aboutText: "To get to the good stuff, just sign up. It also tracks what percentage of the words are in each language.<br/>It's built using Node, Angular and Bootstrap by Ryan Cole. Check out the source on Github."
			},
			
			cz: {
				msNoWords: "Neexistují slova!",
				msNoWord: "není v slovníku.",
				msNoUser: "není uživatel.",
				msNoMatch: "Hesla se neshodují!",
				uiLanguage: "Jazyk",
				btnWords: "Všechna slova",
				btnAdd: "Přidat slovo",
				btnStats: "Statistiky",
				btnUsers: "Uživatelé",
				btnSignInUp: "Přihlásit se",
				btnWhatIs: "Co je to?",
				btnViewUsers: "Zobrazit všechny uživatele",
				formLangSet: "Jazyk",
				formEmail: "E-mail",
				formEditUser: "Editovat uživatele",
				formDeleteUser: "Odstranit uživatele",
				formEditWord: "Upravit slovo",
				formDeleteWord: "Odstranit slovo",
				formDeleteIt: "Odstranit!",
				formCancel: "Zrušit",
				formSays: "Oli říká",
				formMeans: "To znamená, že",
				formLang: "On říká, že je v",
				formTrans: "To se promítá do",
				more: "Více",
				formCancelEdit: "Zrušit editaci",
				formSave: "Uložit",
				formSignin: "Přihlásit",
				formPassword: "Heslo",
				formPasswordAgain: "Opakujte heslo",
				formPasswordMessage: "(ponechte prázdné, aby se staré heslo)",
				formRemember: "Zapamatovat",
				formSubmit: "Předložit",
				uiLoggedInAs: "Přihlášen jako",
				uiNotLoggedIn: "Nejste přihlášen",
				btnLogout: "Odhlásit",
				wordSays: "Když Oli říká",
				wordMeans: "Se znamená",
				wordTrans: "který překládá z anglicky jako",
				statsNumber: "Počet slov",
				english: "Angličtina",
				czech: "Čeština",
				words: "Slova",
				statsThereAre: "Jsou",
				statsUsers: "uživatelů",
				uiNotSigned: "Nejste přihlášeni",
				btnNotReg: "Nejsem registrován",
				btnLoginInstead: "Chci se přihlásit",
				aboutTitle: "To je malá aplikace na pomoc babičky a papáji pochopit jejich Eurotoddler.",
				aboutText: "Chcete-li dostat do dobré věci, jen zaregistrovat. Rovněž sleduje, jaké procento slov se v každém jazyce. <br/> Je vyrobena s použitím Node.js, Angular.js a Bootstrap od Ryan Cole. Podívejte se na zdroje na GitHub."
			}

		}

	};

	return factory;

});

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

app.factory('wordsService', ['$http', '$resource', '$q', function ($http, $resource, $q) {

	var wordsResource = $resource('words', 
		{}, 
		{ 'query' : {method: 'GET', isArray: false, cache: false} });

	var wordResource = $resource('word/:says', {says: '@says'},
		{
			'get': {method: 'GET', isArray: false, cache: false},
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
