/*! Slovnik - v - 2014-01-03
 * http://www.tellmesomethingnice.com
 * Copyright (c) 2014 Ryan Cole;
 * Licensed 
 */
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