'use strict';

angular.module('wecommerceApp', [
    'ui.router',
    'restangular',
    'ngLodash'])

    .config( ['RestangularProvider', '$stateProvider', '$urlRouterProvider',
        function(RestangularProvider, $stateProvider, $urlRouterProvider) {

            console.log('config');

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
                url: '/',
                templateUrl: 'modules/dashboard/index.html',
                controller: 'DashboardController'
              });


            // $routeProvider
            //     .when('/', {
            //         controller: 'HomeController',
            //         templateUrl: 'home/home.view.html',
            //         controllerAs: 'vm'
            //     })

            //     .when('/login', {
            //         controller: 'LoginController',
            //         templateUrl: 'login/login.view.html',
            //         controllerAs: 'vm'
            //     })

            //     .when('/register', {
            //         controller: 'RegisterController',
            //         templateUrl: 'register/register.view.html',
            //         controllerAs: 'vm'
            //     })

            //     .otherwise({ redirectTo: '/login' });
    }])

    .run( ['$rootScope',
        function ($rootScope) {

            console.log('run');
            // keep user logged in after page refresh
            // $rootScope.globals = $cookieStore.get('globals') || {};
            // if ($rootScope.globals.currentUser) {
            //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            // }

            // $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //     // redirect to login page if not logged in and trying to access a restricted page
            //     var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            //     var loggedIn = $rootScope.globals.currentUser;
            //     if (restrictedPage && !loggedIn) {
            //         $location.path('/login');
            //     }
            // });
        }]);

console.log('test 2');