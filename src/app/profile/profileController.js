'use strict';

angular.module('dropshippers')
  .controller('ProfileController',
    ['$scope', '$state', '$mdToast', 'ProfileModel',
      function ($scope, $state, $mdToast, ProfileModel) {
        $scope.user = ProfileModel;
        ProfileModel.loadUser();

        
           
      }
    ]
  );