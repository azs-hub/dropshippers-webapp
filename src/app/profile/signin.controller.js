'use strict';

angular.module('signin.controller', ['profile.service'])
  .controller('SigninController',
    ['$scope', '$state', '$mdToast', 'ProfileService',
      function ($scope, $state, $mdToast, ProfileService) {
        $scope.user = {};
        
        $scope.signin = function () {
        	console.log($scope.user);
          ProfileService.register($scope.user).then(function (res) {
            console.log('---------->', res);
            if (res.status == 200) {
              //redirect
              $state.go('home')
            }else {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Simple Toast!')
                  .position(pinTo )
                  .hideDelay(3000)
              );
              // material not good
            }
          });
            
        };   
      }
    ]
  );