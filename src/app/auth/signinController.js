'use strict';

angular.module('dropshippers')
  .controller('SigninController',
    ['$scope', '$state', 'AuthService',
      function ($scope, $state, AuthService) {
        $scope.user = {};

        $scope.go = function () {
          $state.go('home');
        };
        
        $scope.signin = function () {
        	console.log($scope.user);
          AuthService.register($scope.user).then(function (res){
            console.log("signinController signin : ", res);
          });
        	/*if (user)
          	$state.go('dashboard');*/
        };   
      }
    ]
  );