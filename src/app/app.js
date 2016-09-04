'use strict';

angular.module('dropshippers', [
    'local.config',
    'profile',
    'proposition',
    'auth',
    'product',
    'navbar',
    'ui.router',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngLodash',
    'satellizer'])

    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {
                'default': '500',
                'hue-1':   '200'
            })
            .accentPalette('amber', {
                'default': 'A400'
            });
    })

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

            $stateProvider
              .state('login', {
                url: '/login',
                templateUrl: 'app/auth/login.html',
                controller: 'AuthController'
              })
              .state('home', {
                  url: '/',
                  views: {
                  'full': {
                    templateUrl: 'app/home/index.html',
                    controller: 'HomeController'
                   }
                }
              })
              .state('products', {
                  url: '/products',
                  templateUrl: 'app/product/products.html',
                  controller: 'ProductsController'
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
              .state('about', {
                  url: '/about',
                  templateUrl: 'app/about/about.html'
              })
              .state('detailProduct', {
                url: '/product/:id',
                templateUrl: 'app/product/product.html',
                controller: 'ProductController',
                resolve: {
                  product: function($stateParams, ProductService) {
                    return ProductService.getProduct($stateParams.id).then(function(res) {
                      return res.data;
                    });
                  }
                }
              });
    }])
    .run( ['$rootScope', '$auth',
      function ($rootScope, $auth) {
        //$rootScope.isAuthenticated = $auth.isAuthenticated();

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {

          var signupState = ['signin', 'login', 'home', 'about'];

          // Authenticated user
          if (!$auth.isAuthenticated()) {
            // Asked route is "sign in" or "sign up" forms
            if (_.indexOf(signupState, toState.name) == -1) {
              $rootScope.$emit('auth:logout');
            }
          }
        });
      }
    ]);
