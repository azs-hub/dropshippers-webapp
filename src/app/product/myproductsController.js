'use strict';

angular.module('dropshippers')
  .controller('MyProductsController',
    ['$scope', '$state', '$auth', 'ProductService',
      function ($scope, $state, $auth, ProductService) {
        $scope.products = {};
        $scope.user = {
          isAuth: $auth.isAuthenticated()
        };

        if ($auth.isAuthenticated()) {
          ProductService.getMyProducts().then(function(res) {
            $scope.products = res.local;
          });

        }

        $scope.go = function (productId) {
          $state.go('detailProduct', {id: productId});
        }
      }
    ]
  );