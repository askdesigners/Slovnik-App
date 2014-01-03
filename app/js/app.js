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