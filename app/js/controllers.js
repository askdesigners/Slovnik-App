/*! Slovnik - v - 2013-12-30
 * http://www.tellmesomethingnice.com
 * Copyright (c) 2013 Ryan Cole;
 * Licensed 
 */
app.controller('EditWordCtrl', ['$scope', '$location', '$routeParams', 'wordsService', 'logger', 'messagesService', function($scope, $location, $routeParams, wordsService, logger, messagesService) {
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

}]);
app.controller('SecureCtrl', ['$scope', function($scope){
	
	'use strict';
	
	$scope.message = "Message from Secure Controller";
	
}]);
app.controller('StatsCtrl', ['$scope', '$location', 'statsService', function($scope, $location, statsService) {
	'use strict';

	statsService()
		
		.then(function (data){
			
			console.log(data);

			$scope.stats = data;
			
		}, function (error){

			console.log(error);
		
		});

}]);
app.controller('WordCtrl', ['$scope', '$routeParams', '$location', 'wordsService', 'logger', 'messagesService', function($scope, $routeParams, $location, wordsService, logger, messagesService) {
	'use strict';
    
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