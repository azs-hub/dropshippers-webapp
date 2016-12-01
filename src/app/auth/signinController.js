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
            AuthService.register($scope.user)
                .then(function (res) {
                    console.log(res);
                    if (res.status == 200)
                    {
                        $state.go('login');
                    }
                });
        };
      }
    ]
  );
