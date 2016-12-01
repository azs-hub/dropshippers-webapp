'use strict';

angular.module('auth.controller', [])
  .controller('AuthController',
    ['$scope', '$state', '$auth', '$mdToast', 'AuthService',
      function ($scope, $state, $auth, $mdToast, AuthService) {
        $scope.user = null;
        $scope.go = function () {
          $state.go('home');
        };
          $scope.login = function () {
              if ($scope.user != null)
              {
                  AuthService.login($scope.user)
                      .then(function(response) {
                          if (response.status == 200)
                          {
                              $auth.setToken(response);
                              $scope.$emit('auth:loged');
                              $state.go('products');
                          }
                          else {
                              // toastr.error($filter('translate')('HTTP_403'));
                              // $mdToast.show(
                              //   $mdToast.simple()
                              //     .textContent('Bad credidential!')
                              //     .hideDelay(3000)
                              // );
                          }

                      });
              }

          };

        $scope.Password = 'password';
      }
    ]
  );
