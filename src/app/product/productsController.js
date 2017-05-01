'use strict';

angular.module('dropshippers')
	.filter('startFrom', function() {
	    return function(input, start) {
	    	console.log('input : ', input, ' start : ', start);
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	});

angular.module('dropshippers')
	.controller('ProductsController',
		['$scope', '$state', '$auth', 'ProductService', 'PropositionService', 'ProfileModel', 'categoryList', 'productList',
		function ($scope, $state, $auth, ProductService, PropositionService, ProfileModel, categoryList, productList) {
				
			console.log('categoryList : ', categoryList);
			
			$scope.categories = categoryList;
			$scope.products = productList.products;
			$scope.pagination = productList.pagination; //{currentPage: 1, firstPage: 1, lastPage: 5, nextPage: 2, nombre_de_page: 5, nombre_de_resultats: 5};
			$scope.search = {
				name: null,
				minPrice: null,
				maxPrice: null,
				categories: null,
				numeroPage: productList.pagination.currentPage,
				maxPerPage: 4
			};
			$scope.user = ProfileModel;
			ProfileModel.loadUser();
			
			// $scope.pagination = {
			// 	currentPage: 0,
			// 	total: 0,
			// 	limitProduct: 3
			// };

			
			$scope.searchProducts = function () {
				ProductService.getProducts(_.omitBy($scope.search, _.isNull || _.isEmpty)).then(function(res) {
					$scope.products = res.products;
					$scope.pagination = res.pagination;
	        		return res;
	      		});
			};

			$scope.$watch('pagination.currentPage', function (file) {
				$scope.search.numeroPage = $scope.pagination.currentPage;
		        $scope.searchProducts();
		    });

			$scope.go = function (productId) {
				$state.go('product.detail', {id: productId});
			};

	}]);