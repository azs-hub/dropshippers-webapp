'use strict';

angular.module('wecommerceApp')
  .controller('AuthController',
    ['$scope', '$state',
      function ($scope, $state) {
        $scope.login = function () {
          $state.go('dashboard');
        };
        $scope.Password = 'password';
      }
    ]
  );