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
