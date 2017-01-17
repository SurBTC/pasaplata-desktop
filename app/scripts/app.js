'use strict';

/**
 * @ngdoc overview
 * @name pasaplataMakerApp
 * @description
 * # pasaplataMakerApp
 *
 * Main module of the application.
 */
angular
  .module('pasaplataMakerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-storage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/configure', {
        templateUrl: 'views/configure.html',
        controller: 'ConfigureCtrl',
        controllerAs: 'configure'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
