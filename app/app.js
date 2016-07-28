'use strict';

angular.module('wecommerceApp', [
    'local.config',
    'ui.router',
    'restangular',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngLodash',
    'satellizer'])
    .config( ['$stateProvider', '$urlRouterProvider', '$authProvider', 'BASE_URL_API',
        function($stateProvider, $urlRouterProvider, $authProvider, BASE_URL_API) {
            $urlRouterProvider.otherwise('/');
            
            $authProvider.baseUrl = BASE_URL_API;
            $authProvider.loginUrl = "login/signin";
            $authProvider.tokenName = "token";
            $authProvider.authHeader = "auth-token";

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