'use strict';

angular.module('wecommerceApp', [
    'ui.router',
    'restangular',
    'ngCookies',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngLodash'])
    .config( ['RestangularProvider', '$stateProvider', '$urlRouterProvider',
    '$locationProvider', 
    '$httpProvider', 
        function(RestangularProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

            var access = routingConfig.accessLevels;

            console.log(access, $httpProvider, $httpProvider.responseInterceptors);
            RestangularProvider.setBaseUrl('/api/v1');

            $urlRouterProvider.otherwise('/');

            $stateProvider
              .state('user', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.user
                }
              })
              .state('user.dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/index.html',
                controller: 'DashboardController'
              })

              
              .state('anon', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    access: access.anon
                }
              })
              .state('anon.login', {
                url: '/login',
                templateUrl: 'modules/auth/login.html',
                controller: 'AuthController'
              })
              .state('anon.home', {
                url: '/',
                templateUrl: 'modules/home/index.html',
                controller: 'HomeController'
              })
              .state('anon.signin', {
                url: '/signin',
                templateUrl: 'modules/auth/signin.html',
                controller: 'SigninController'
              });

              var interceptor = ['$location', '$q', function($location, $q) {
                function success(response) {
                    console.log('interceptor success : ', response);
                    return response;
                }

                function error(response) {
                    console.log('interceptor error : ', response);
                    if(response.status === 401) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }

                return function(promise) {
                    return promise.then(success, error);
                }
              }];

          $httpProvider.interceptors.push(interceptor);
    }])
    .run( ['$rootScope', 'Auth', '$state',
        function ($rootScope, Auth, $state) {

          console.log('------------------');

          $rootScope.$on("$stateChangeStart", 
              function (event, toState, toParams, 
                        fromState, fromParams) {
                
              if (!Auth.authorize(toState.data.access)) {
                  $rootScope.error = "Access denied";
                  event.preventDefault();
                  if(fromState.url === '^') {
                      if(Auth.isLoggedIn())
                          $state.go('user.dashboard');
                      else {
                          $rootScope.error = null;
                          $state.go('anon.login');
                      }
                  }
              }

          });

          // $rootScope.$on("$stateChangeStart", function (event, next, current) {
          //   console.log('$stateChangeStart', Auth.authorize(next.access));
          //   if (!Auth.authorize(next.access)) {
          //     if(Auth.isLoggedIn()) $state.go('home');
          //     else                  $state.go('login');
          //   }
          // });

        }]);