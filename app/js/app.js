/*! Slovnik - v - 2014-01-03
 * http://www.tellmesomethingnice.com
 * Copyright (c) 2014 Ryan Cole;
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
    .when('/edit/:says', {
        templateUrl: '/partials/editword',
        controller: 'EditWordCtrl'
    })
    .when('/newword', {
        templateUrl: '/partials/newword',
        controller: 'NewWordCtrl'
    })
    .when('/about', {
        templateUrl: '/partials/about',
        controller: 'AboutCtrl'
    })
    .when('/users', {
        templateUrl: '/partials/usersList',
        controller: 'UsersCtrl'
    })
    .when('/user/:email', {
        templateUrl: '/partials/user',
        controller: 'UserCtrl'
    })
    .when('/edituser/:email', {
        templateUrl: '/partials/edituser',
        controller: 'EditUserCtrl'
    })
    .when('/stats', {
        templateUrl: '/partials/stats',
        controller: 'StatsCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    }); 
}]);
app.filter('object2Array', function() {
	
	return function(input) {

		var out = []; 
	
		for (var i in input){
			
			out.push(input[i]);
	
		}
	
		return out;
	
	};

});
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

app.controller('EditUserCtrl', ['$scope', '$location', '$routeParams', 'usersService', 'langService', 'logger', 'messagesService', function($scope, $location, $routeParams, usersService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		usersService.get($routeParams.email)
			
			.then(function (data){

				$scope.query = $routeParams.email;
				
				$scope.userExists = data.userExists;
				
				$scope.user = data.user;

				$scope.user.password = ''; 

				$scope.user.repeatPassword = '';
				
			}, function (error){

				console.log(error);
			
			});

		$scope.original = angular.copy($scope.user);


		$scope.cancelEdit = function(){

			$scope.user = angular.copy($scope.original);

			$location.path('/user/' + $routeParams.email);		
		
		};


		$scope.checkMatch = function() {
		
			if($scope.user) return $scope.user.password !== $scope.user.repeatPassword;
		
		}; 


		$scope.saveEditedUser = function(user){
			
			usersService.update($routeParams.email, user)
			
			.then(function (data){	

				if(data.error === 1) {
				
					logger.error("Couldn't update the user");
				
				} else {
				
					logger.success("User updated");

					langService.setLang(data.user.language);
				
					$location.path('/user/' + data.user.email);
				
				}
			
			}, function (error){
			
				console.log(error);
			
			});
		
		};		

		$scope.canSave = function(){
			
			if($scope.newUserForm.$valid && $scope.newUserForm.$dirty){
			
				return true;
			
			} else {
			
				return false;
			
			}
		
		};

	} else {

		logger.error('You need to login to edit a user');

		$location.path('/login');
	
	}

}]);
app.controller('EditWordCtrl', ['$scope', '$location', '$routeParams', 'wordsService', 'langService', 'logger', 'messagesService', function($scope, $location, $routeParams, wordsService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		wordsService.get($routeParams.says)
			
			.then(function (data){

				$scope.query = $routeParams.says;
				
				$scope.wordExists = data.wordExists;
				
				$scope.word = data.word;
				
			}, function (error){

				console.log(error);
			
			});

		$scope.original = angular.copy($scope.word);

		$scope.cancelEdit = function(){

			$scope.word = angular.copy($scope.original);

			$location.path('/word/' + $routeParams.says);		
		
		};

		$scope.saveEditedWord = function(word){

			word.addedby = $scope.email;
			console.log($scope.email);
			
			wordsService.update($routeParams.says, word)
			
			.then(function (data){	

				if(data.error === 1) {
				
					logger.error($scope.messages["word lost"]);
				
				} else {
				
					logger.success($scope.messages["word saved"]);
				
					$location.path('/word/' + data.word.says);
				
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

	} else {

		logger.error('You need to login to edit a word');

		$location.path('/login');
	
	}

}]);
app.controller('LoginCtrl',['$scope', '$rootScope', '$http', 'langService', 'logger', 'messagesService', function($scope, $rootScope, $http, langService, logger, messagesService){
    'use strict';


    $scope.l = langService.language();
 
    $scope.messages = messagesService.messages; 

    $scope.user = {};
 
    $scope.newUser = {};
 
    $scope.isLogin = true;
 
    $scope.buttonText = $scope.messages["register"];

    $scope.changeLang = function(){

        langService.setLang($scope.newUser.language);

        $scope.l = langService.language();
    
    };

    $scope.toggleLogin = function() {

        if($scope.isLogin) {

            $scope.isLogin = false;

            $scope.buttonText = $scope.l.btnNotReg;

        }

        else {

            $scope.isLogin = true;

            $scope.buttonText = $scope.l.btnLoginInstead;

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


    $scope.createUser = function(email, password, language) {
        
        var request = $http.post('/register', {email: email, password: password, language: language});

        return request.then(function(response) {

            if(response.data.error === 1) {

                logger.error(response.data.user + $scope.messages["alreadyRegistered"]);

            }

            else {

                logger.success(response.data.user + $scope.messages["registerSuccess"]);

                $scope.login(email, password);

            }

        });

    };    


    $scope.checkMatch = function() {

        return $scope.newUser.password !== $scope.newUser.repeatPassword;

    }; 

}]);


app.controller('RootCtrl', ['$scope', '$location', '$http', 'langService', 'logger', function($scope, $location, $http, langService, logger) {
  
    'use strict';

    var updateLang = function(){
    
        $scope.l = langService.language();

    };

    langService.registerObserverCallback(updateLang);    
    
    var request = $http.get('/getActiveUser');

    request.then(function(response) {
    
        if(response.data.loggedIn === 1) {
    
            $scope.isLoggedIn = true;
    
            $scope.email = response.data.user.email;
    
            langService.setLang(response.data.user.language);

            console.log(response.data.user.language);
    
        }
    
        else {
    
            $scope.isLoggedIn = false;
    
            $scope.email = "Anonymous";

            langService.setLang("en");
    
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

    };

    $scope.login = function(email, password) {

        var request = $http.post('/login', {email: email, password: password});

        return request.then(function(response) {

            if(response.data.error === 1) {

                logger.error($scope.$$childTail.messages[response.data.message]);    

            }

            else {

                $scope.isLoggedIn = true;

                $location.path('/words');

                $scope.email = response.data.user;

                if(response.data.language){
                    langService.setLang(response.data.language);
                } else {
                    langService.setLang("en");
                }
                
                logger.success("Welcome " + response.data.user + "!");

            }

            $scope.l = langService.language();

        });        

    };    


    $scope.logout = function () {

        $http.post('/logout').

        success(function(data) {

            $scope.isLoggedIn = false;

            window.location.href = '/';

        });

    };    

}]);

app.controller('AboutCtrl', ['$scope', 'langService', function($scope, langService){

    'use strict';

    $scope.l = langService.language();
    
}]);

app.controller('NewWordCtrl', ['$scope', '$location', 'wordsService', 'langService', 'logger', 'messagesService', function($scope, $location, wordsService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();
	
	if($scope.isLoggedIn === true){

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

		$scope.cancelCreate = function(){

			$scope.word = {};

			$location.path('/words');		
		
		};	

		$scope.canSave = function(){
			
			if($scope.newWordForm.$valid && $scope.newWordForm.$dirty){
			
				return true;
			
			} else {
			
				return false;
			
			}
		
		};

	} else {

		logger.error('You need to login to create a word');

		$location.path('/login');

	}

}]);
app.controller('SecureCtrl', ['$scope', function($scope){
	
	'use strict';
	
	$scope.message = "Message from Secure Controller";
	
}]);
app.controller('StatsCtrl', ['$scope', '$location', 'statsService', 'langService', 'logger', function($scope, $location, statsService, langService, logger) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){

		statsService()
		
		.then(function (data){
			
			$scope.stats = data;
			
		}, function (error){

			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the stats page');

		$location.path('/login');

	}

}]);
app.controller('UserCtrl', ['$scope', '$routeParams', '$location', 'usersService', 'langService', 'logger', 'messagesService', function($scope, $routeParams, $location, usersService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		$scope.deleting = false;

		console.log($routeParams.email);

		usersService.get($routeParams.email)
			
			.then(function (data){

				$scope.query = $routeParams.email;
				
				$scope.userExists = data.userExists;
				
				$scope.user = data.user;

			}, function (error){

				console.log(error);
			
			});

		$scope.edit = function(){

			$location.path('/edituser/' + $routeParams.email);
		
		};

		$scope.showDelete = function(){

			$scope.deleting = true;

		};

		$scope.cancelDelete = function(){

			$scope.deleting = false;

		};

		$scope.deleteUser = function(){

			usersService.removeUser($routeParams.email)

				.then(function (data){	

				if(data.error === 1) {
				
					logger.error("The user couldn't be deleted!");
				
				} else {
				
					logger.success("The user was deleted!");
				
					$location.path('/users');
				
				}
			
			}, function (error){
			
				console.log(error);
			
			});
		};

	} else {

		logger.error('You need to login to see a users profile');

		$location.path('/login');
	}

}]);
app.controller('UsersCtrl', ['$scope', '$location', 'usersService', 'langService', 'logger', function($scope, $location, usersService, langService, logger) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){

		usersService.query()
			
		.then(function (data){
			
			$scope.usersExist = (data.userCount > 0) ? true : false;
		
			$scope.usersList = data.users;
		
		}, function (error){
		
			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the users list');

		$location.path('/login');
	}

}]);
app.controller('WordCtrl', ['$scope', '$routeParams', '$location', 'wordsService', 'langService', 'logger', 'messagesService', function($scope, $routeParams, $location, wordsService, langService, logger, messagesService) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){
	
		$scope.messages = messagesService.messages; 

		$scope.deleting = false;

		wordsService.get($routeParams.says)
			
			.then(function (data){

				$scope.query = $routeParams.says;
				
				$scope.wordExists = data.wordExists;
				
				$scope.word = data.word;
				
			}, function (error){

				console.log(error);
			
			});

		$scope.edit = function(){

			$location.path('/edit/' + $routeParams.says);
		
		};

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

	} else {

		logger.error('You need to login to see the definition page');

		$location.path('/login');
	}

}]);
app.controller('WordsCtrl', ['$scope', '$location', 'wordsService', 'langService', 'logger', function($scope, $location, wordsService, langService, logger) {
	'use strict';

	$scope.l = langService.language();

	if($scope.isLoggedIn === true){

		wordsService.query()
			
		.then(function (data){
			
			$scope.wordsExist = (data.wordCount > 0) ? true : false;
		
			$scope.wordsList = data.words;
		
		}, function (error){
		
			console.log(error);
		
		});

	} else {

		logger.error('You need to login to see the words list');

		$location.path('/login');
	}

}]);
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
