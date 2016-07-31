'use strict';

angular.module('wecommerceApp')
  .controller('AuthController',
    ['$scope', '$state', '$auth', 'AuthService',
      function ($scope, $state, $auth, AuthService) {
        $scope.user = null;
        $scope.login = function () {
          if ($scope.user != null) 
          {
            AuthService.login($scope.user)
              .then(function(response) {
                if (response.status == 200)
                {
                  console.log("then",response);
                  $auth.setToken(response);
                }
                console.log("status not 200");
                
              });
          }
          
        };

        $scope.Password = 'password';
      }
    ]
  );