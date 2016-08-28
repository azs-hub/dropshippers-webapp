'use strict';

angular.module('product.controller', ['proposition.service'])
  .controller('ProductController',
    ['$scope', '$auth', 'product', 'PropositionService',
      function ($scope, $auth, product, PropositionService) {
      	$scope.user = {
      		isAuth: $auth.isAuthenticated()
      	};

        $scope.product = product.data.product;
        console.log('-------------->', product);

        $scope.props = function () {
          PropositionService.addProposition($scope.product.dropshippers_ref).then(function(res) {
            console.log(res);
          });
        }
      }
    ]
  );