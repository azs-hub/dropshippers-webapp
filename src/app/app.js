'use strict';

angular.module('dropshippers', [
    'local.config',
    'profile',
    'proposition',
    'auth',
    'product',
    'ui.router',
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

            if (shared.isAuthenticated() && config.httpInterceptor(request)) {

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

            console.log('ANAIS');
            
            $stateProvider
              .state('login', {
                url: '/login',
                templateUrl: 'app/auth/login.html',
                controller: 'AuthController'
              })
              .state('home', {
                url: '/',
                templateUrl: 'app/home/index.html',
                controller: 'HomeController'
              })
              .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/index.html',
                controller: 'DashboardController'
              })
              .state('signin', {
                url: '/signin',
                templateUrl: 'app/auth/signin.html',
                controller: 'SigninController'
              })
              .state('detailProduct', {
                url: '/product/:id',
                templateUrl: 'app/product/product.html',
                controller: 'ProductController',
                resolve: {
                  product: function($stateParams, ProductService) {
                    return ProductService.getProduct($stateParams.id).then(function(res) {
                      console.log('OKE', res.data);
                      return res.data;
                    });
                  }
                }
              });
    }])
    .run( ['$rootScope',
        function ($rootScope) {
        }]);