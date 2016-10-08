'use strict';

angular.module('dropshippers')
  .controller('ProductsController',
    ['$scope', '$state', '$auth', 'ProductService', 'PropositionService', 'ProfileModel',
      function ($scope, $state, $auth, ProductService, PropositionService, ProfileModel) {
        $scope.products = {};
        $scope.pagination = {
          currentPage: 0,
          total: 0,
          limitProduct: 3
        };
        $scope.search = {
          excludeShopRef: null,
          productName: null,
          prixMin: null,
          prixMax: null
        };
        $scope.user = ProfileModel;
        ProfileModel.loadUser();

        ProductService.getProducts().then(function(res) {
          $scope.products = res.products;
          $scope.total = res.products.length;
          $scope.pageSize = res.products.length / 3;
        });

        $scope.go = function (productId) {
          $state.go('detailProduct', {id: productId});
        }

        $scope.paginateProducts = function(page, pageSize, total) {
        
        };
      }
    ]
  );