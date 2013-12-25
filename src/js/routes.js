app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/login', {
        templateUrl: '/partials/enter',
        controller: 'LoginCtrl'
    })
    .when('/unsecured', {
        templateUrl: '/partials/unsecure',
        controller: 'UnsecureCtrl'
    })
    .when('/secure', {
        templateUrl: '/partials/secure',
        controller: 'SecureCtrl'
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
    .otherwise({
      redirectTo: '/login'
    }); 
}]);