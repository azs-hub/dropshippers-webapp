'use strict';

angular.module('dropshippers')
  .controller('ProductController',
    ['$scope', '$auth', 'product', 'PropositionService',
      function ($scope, $auth, product, PropositionService) {
        $scope.user = {
          isAuth: $auth.isAuthenticated()
        };

        $scope.product = product.product;

        $scope.props = function () {
          PropositionService.addProposition($scope.product.dropshippers_ref).then(function(res) {
            console.log(res);
          });
        };

      }
    ]
  );