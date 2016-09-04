'use strict';

angular.module('dropshippers')
  .controller('AuthController',
    ['$scope', '$state', '$auth', '$mdToast', 'AuthService',
      function ($scope, $state, $auth, $mdToast, AuthService) {
        $scope.user = null;
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
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent('Bad credidential!')
                      
                      .hideDelay(3000)
                  );
                  // material not good
                }
                //console.log("status not 200");
                
              });
          }
          
        };

        $scope.Password = 'password';
      }
    ]
  );