'use strict';

angular
    .module('wecommerce', [
        'restangular'])

    .config( ['$urlRouterProvider',
        function($urlRouterProvider) {

            console.log('toto');

            /*(RestangularProvider.setBaseUrl('/api/v1');

            $urlRouterProvider.otherwise('/login');

            $stateProvider
              .state('login', {
                url: '/login',
                templateUrl: 'modules/auth/login.html',
                controller: 'AuthController'
              });*/


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