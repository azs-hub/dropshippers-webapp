'use strict';

angular.module('wecommerceApp')
  .controller('SigninController',
    ['$scope', '$state',
      function ($scope, $state) {
        $scope.signin = function (user) {
        	console.log(user);
        	if (user)
          	$state.go('dashboard');
        };   
      }
    ]
  );