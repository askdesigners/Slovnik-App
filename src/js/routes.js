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
    .otherwise({
      redirectTo: '/login'
    }); 
}]);