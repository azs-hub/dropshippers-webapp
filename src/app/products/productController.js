'use strict';

angular.module('dropshippers')
  .controller('ProductController',
    ['$scope', '$state', '$auth', 'product', 
      function ($scope, $state, $auth, product) {
      	$scope.products = {};
      	$scope.user = {
      		isAuth: $auth.isAuthenticated()
      	};

        console.log(product);

      //   if ($auth.isAuthenticated()) {
      //   	ProductService.getProducts().then(function(res) {
      //       $scope.products = res.products;
      //       console.log(res);
      //   	});

	     // }
      }
    ]
  );