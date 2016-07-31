'use strict';

angular.module('signin.controller', ['profile.service'])
  .controller('SigninController',
    ['$scope', '$state', 'ProfileService',
      function ($scope, $state, ProfileService) {
        $scope.user = {};
        
        $scope.signin = function () {
        	console.log($scope.user);
          ProfileService.register($scope.user);
        };   
      }
    ]
  );