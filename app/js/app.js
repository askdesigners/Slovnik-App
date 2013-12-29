/*! Slovnik - v - 2013-12-29
 * tellmesomethingnice.com
 * Copyright (c) 2013 Ryan Cole;
 * Licensed 
 */
var app = angular.module('slovnik', ['ngRoute','ngResource']);
app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/login', {
        templateUrl: '/partials/login',
        controller: 'LoginCtrl'
    })
    .when('/words', {
        templateUrl: '/partials/wordsList',
        controller: 'WordsCtrl'
    })
    .when('/word/:says', {
        templateUrl: '/partials/word',
        controller: 'WordCtrl'
    })
    .when('/newword', {
        templateUrl: '/partials/newword',
        controller: 'NewWordCtrl'
    })
    .when('/about', {
        templateUrl: '/partials/about',
        controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    }); 
}]);
app.factory('logger', [function () { 
	toastr.options.timeOut = 3000; // 2 second toast timeout
	toastr.options.positionClass = 'toast-bottom-full-width';

	var logger = {
		error: error,
		info: info,
		success: success,
		warning: warning,
		log: log // straight to console; bypass toast
	};

	function error(message, title) {
		toastr.error(message, title);
		log("Error: " + message);
	}

	function info(message, title) {
		toastr.info(message, title);
		log("Info: " + message);
	}
	
	function success(message, title) {
		toastr.success(message, title);
		log("Success: " + message);
	}
	
	function warning(message, title) {
		toastr.warning(message, title);
		log("Warning: " + message);
	}

	function log(){
		log.history = log.history || [];   // store logs to an array for reference
		log.history.push(arguments);
		if(this.console){
			console.log( Array.prototype.slice.call(arguments) );
		}
	}

	return logger;
}]);

app.controller('LoginCtrl',['$scope', '$rootScope', '$http', 'logger', 'messagesService',function($scope, $rootScope, $http, logger, messagesService){
    'use strict';
    $scope.messages = messagesService.messages; 

    $scope.user = {};
    $scope.newUser = {};
    $scope.isLogin = true;
    $scope.buttonText = $scope.messages["register"];

    $scope.toggleLogin = function() {
        if($scope.isLogin) {
            $scope.isLogin = false;
            $scope.buttonText = $scope.messages["login"];
        }
        else {
            $scope.isLogin = true;
            $scope.buttonText = $scope.messages["register"];
        }
    };

    $scope.canSubmit = function() {
        if($scope.isLogin) {
            if($scope.user.email !== undefined && $scope.user.password !== undefined &&
                $scope.user.email !== '' && $scope.user.password !== '') {
                return true;
            }
            else return false;
        }
        else {
            if(!$scope.checkMatch() && $scope.newUser.email !== undefined && $scope.newUser.password !== undefined &&
                $scope.newUser.email !== '' && $scope.newUser.password !== '') {
                return true;
            }                
            else {
                return false;
            }
        }
    };

    $scope.createUser = function(email, password, role) {

        var request = $http.post('/register', {email: email, password: password, role: role});

        return request.then(function(response) {
            if(response.data.error === 1) {
                logger.error(response.data.user + $scope.messages["alreadyRegistered"]);
            }
            else {
                logger.success(response.data.user + $scope.messages["registerSuccess"]);
            }
        });
    };    

    $scope.checkMatch = function() {
        return $scope.newUser.password !== $scope.newUser.repeatPassword;
    }; 
}]);

app.controller('RootCtrl', ['$scope', '$location', '$http', 'logger', function($scope, $location, $http, logger) {
    'use strict';
    var request = $http.get('/getUserDetails');

    request.then(function(response) {
        if(response.data.loggedIn === 1) {
            $scope.isLoggedIn = true;
            $scope.email = response.data.user.email;
        }
        else {
            $scope.isLoggedIn = false;
            $scope.email = "Anonymous";
        }
    });

    $scope.locate = function(loc){
        $location.path(loc);
    };

    $scope.active = function(loc){
        if($location.path() == loc){
            return true;
        } else {
            return false;
        }
    }

    $scope.login = function(email, password) {

        var request = $http.post('/login', {email: email, password: password});

        return request.then(function(response) {
            if(response.data.error === 1) {
                logger.error($scope.$$childTail.messages[response.data.message]);    
            }
            else {
                $scope.isLoggedIn = true;
                window.location.href = '#/words';
                $scope.email = response.data.user;
                logger.success("Welcome " + response.data.user + "!");
            }
        });        
    };    

    $scope.logout = function () {
        $http.post('/logout').
        success(function(data) {
            $scope.isLoggedIn = false;
            window.location.href = '/';
        });
    }    

}]);

app.controller('AboutCtrl', ['$scope', function($scope){
    'use strict';
    
}]);

app.controller('NewWordCtrl', ['$scope', '$location', 'wordsService', 'logger', 'messagesService', function($scope, $location, wordsService, logger, messagesService) {
	'use strict';
	
	$scope.messages = messagesService.messages; 

    $scope.saveWord = function(word){
		
		wordsService.create(word)
		
		.then(function (data){	

			if(data.error === 1) {
            
                logger.error($scope.messages["word lost"]);
            
            } else {
            
                logger.success($scope.messages["word saved"]);
            
                $location.path('/words');
            
            }
		
		}, function (error){
		
			console.log(error);
		
		});
    
    };		

	$scope.canSave = function(){
		
		if($scope.newWordForm.$valid && $scope.newWordForm.$dirty){
		
			return true;
		
		} else {
		
			return false;
		
		}
	
	};

}]);
app.controller('SecureCtrl', ['$scope', function($scope){
	
	'use strict';
	
	$scope.message = "Message from Secure Controller";
	
}]);
app.controller('WordCtrl', ['$scope', '$routeParams', '$location', 'wordsService', 'logger', 'messagesService', function($scope, $routeParams, $location, wordsService, logger, messagesService) {
	'use strict';
    
    $scope.messages = messagesService.messages; 

	wordsService.get($routeParams.says)
		
		.then(function (data){

			$scope.query = $routeParams.says;
			
			$scope.wordExists = data.wordExists;
			
			$scope.word = data.word;
			
		}, function (error){

			console.log(error);
		
		});

	$scope.deleting = false;

	$scope.showDelete = function(){
		$scope.deleting = true;
	};

	$scope.cancelDelete = function(){
		$scope.deleting = false;
	};

	$scope.deleteWord = function(){

		wordsService.removeWord($routeParams.says)

			.then(function (data){	

			if(data.error === 1) {
            
                logger.error($scope.messages["delete failed"]);
            
            } else {
            
                logger.success($scope.messages["word deleted"]);
            
                $location.path('/words');
            
            }
		
		}, function (error){
		
			console.log(error);
		
		});
	};

}]);
app.controller('WordsCtrl', ['$scope', 'wordsService', function($scope, wordsService) {
	'use strict';

	wordsService.query()
		
	.then(function (data){
		
		$scope.wordsExist = (data.wordCount > 0) ? true : false;
	
		$scope.wordsList = data.words;
	
	}, function (error){
	
		console.log(error);
	
	});

}]);
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
		//create : function (payload) {
		//console.log('create!');
		//wordResource.create(payload, function(resp){
		//console.log(resp);
		//});
		//},
		update : function (says, payload) {
			console.log('update: '+ says);
			console.log(payload);
			wordResource.update({says: says}, payload, function(resp){
				console.log(resp);
			});
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
