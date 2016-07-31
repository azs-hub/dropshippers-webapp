'use strict';

angular.module('wecommerceApp')
  .controller('HomeController',
    ['$scope', '$state', '$auth', 'ProductService', 
      function ($scope, $state, $auth, ProductService) {
      	$scope.products = {};
      	$scope.user = {
      		isAuth: $auth.isAuthenticated()
      	};

        if ($auth.isAuthenticated) {
        	ProductService.getProducts().then(function(res) {
        		$scope.products = res;
        	});
	    }
      }
    ]
  );