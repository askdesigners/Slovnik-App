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

    $scope.createUser = function(email, password, language) {

        console.log(email + ":" + password + ":" + language);
        
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

app.controller('RootCtrl', ['$scope', '$location', '$http', 'logger', function($scope, $location, $http, logger) {
    'use strict';
    var request = $http.get('/getActiveUser');

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
    };

    $scope.login = function(email, password) {

        console.log('login');

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
    };    

}]);

app.controller('AboutCtrl', ['$scope', function($scope){
    'use strict';
    
}]);
