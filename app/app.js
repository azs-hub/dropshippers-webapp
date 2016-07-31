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
    .factory('SatellizerInterceptor', [
      '$q',
      'SatellizerConfig',
      'SatellizerStorage',
      'SatellizerShared',
      function($q, config, storage, shared) {
        return {
          request: function(request) {
            if (request.skipAuthorization) {
              return request;
            }

            console.log('---->', config, shared, storage.get("token"));

            if (shared.isAuthenticated() && config.httpInterceptor(request)) {
              //var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
              //var token = storage.get("token");

              //if (config.authHeader && config.authToken) {
                //token = storage.get("satellizer_token");
              //}

              request.headers["token"] = storage.get("satellizer_token");
            }

            return request;
          },
          responseError: function(response) {
            return $q.reject(response);
          }
        };
      }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('SatellizerInterceptor');
    }])
    .config( ['$stateProvider', '$urlRouterProvider', '$authProvider', 'BASE_URL_API',
        function($stateProvider, $urlRouterProvider, $authProvider, BASE_URL_API) {
            $urlRouterProvider.otherwise('/');
            
            $authProvider.baseUrl = BASE_URL_API;
            $authProvider.loginUrl = "login/signin";
            $authProvider.tokenName = "token";
            $authProvider.authHeader = "token";
            $authProvider.tokenHeader = "token";
            
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