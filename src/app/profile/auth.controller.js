'use strict';

angular.module('auth.controller', [])
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