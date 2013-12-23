/*! meanseed - v0.0.1 - 2013-12-23
 * tellmesomethingnice.com
 * Copyright (c) 2013 Ryan Cole;
 * Licensed 
 */
var app = angular.module('slovnik', ['ngRoute','ngResource']);
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
    .when('/word', {
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