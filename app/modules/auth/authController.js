'use strict';

angular.module('wecommerceApp')
  .controller('AuthController',
    ['$scope', '$state', 'Auth',
      function ($scope, $state, Auth) {

        $scope.login = function () {
          Auth.login($scope.user);
          $state.go('user.dashboard');
        };

        $scope.logout = function () {
          Auth.logout($scope.user);
          $state.go('anon.home');
        };
      }
    ]
  );