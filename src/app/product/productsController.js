'use strict';

angular.module('dropshippers')
  .controller('ProductsController',
    ['$scope', '$state', '$auth', 'ProductService', 'PropositionService',
      function ($scope, $state, $auth, ProductService, PropositionService) {
        $scope.products = {};
        $scope.user = {
          isAuth: $auth.isAuthenticated()
        };

        if ($auth.isAuthenticated()) {
          ProductService.getProducts().then(function(res) {
            $scope.products = res.products;
            console.log('products', res);
          });

        }

        $scope.go = function (productId) {
          //alert(productId);
          $state.go('detailProduct', {id: productId});
        }
      }
    ]
  );