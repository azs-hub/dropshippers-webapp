'use strict';

angular.module('wecommerceApp')
  .controller('SigninController',
    ['$scope', '$state', 'AuthService',
      function ($scope, $state, AuthService) {
        $scope.user = {};
        $scope.signin = function () {
        	console.log($scope.user);
          AuthService.register($scope.user);
          /*.then(function (res){
            console.log("signinController : ", res);
          });*/
        	/*if (user)
          	$state.go('dashboard');*/
        };   
      }
    ]
  );