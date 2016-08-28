'use strict';

angular.module('dropshippers')
  .controller('ProductController',
    ['$scope', '$auth', 'product', 
      function ($scope, $auth, product) {
      	$scope.user = {
      		isAuth: $auth.isAuthenticated()
      	};

        $scope.product = product.data.product;
        console.log('-------------->', product);

      //   if ($auth.isAuthenticated()) {
      //   	ProductService.getProduct(product.dropshippers_ref).then(function(res) {
      //       $scope.product = res.product;
      //       console.log(res);
      //   	});

	     // }
      }
    ]
  );