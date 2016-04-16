'use strict';

angular.module('wecommerceApp', [
    'ui.router',
    'restangular',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngLodash'])
    .config( ['RestangularProvider', '$stateProvider', '$urlRouterProvider',
        function(RestangularProvider, $stateProvider, $urlRouterProvider) {

            RestangularProvider.setBaseUrl('/api/v1');

            $urlRouterProvider.otherwise('/');

            $stateProvider
              .state('login', {
                url: '/login',
                templateUrl: 'modules/auth/login.html',
                controller: 'AuthController'
              })
              .state('home', {
                url: '/',
                templateUrl: 'modules/home/index.html',
                controller: 'HomeController'
              })
              .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/index.html',
                controller: 'DashboardController'
              })
              .state('signin', {
                url: '/signin',
                templateUrl: 'modules/auth/signin.html',
                controller: 'SigninController'
              });
    }])
    .run( ['$rootScope',
        function ($rootScope) {
        }]);