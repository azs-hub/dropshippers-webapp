'use strict';

angular.module('dropshippers')
  .controller('ProductController',
    ['$scope', '$auth', 'product', 'PropositionService', 'NgTableParams', '$filter',
      function ($scope, $auth, product, PropositionService, NgTableParams, $filter) {
        $scope.user = {
          isAuth: $auth.isAuthenticated()
        };
        $scope.product = product.product;

console.log('$scope.product', $scope.product);

        var proposition = {
          product_reference: product.product.dropshippers_ref,
          quantity: 1,
          deliveryArea: 'all'
        };

        $scope.props = function () {
          angular.extend($scope.proposition, proposition);
          PropositionService.addProposition($scope.proposition).then(function(res) {
            console.log(res);
          });
        };

        var messages = [
            {
              "idEntity":6,
              "message":"1466513470000",
              "prix":10,
              "white":true,
              "zone":[
                {
                  "ref": 12,
                  "name": "europe"  
                },
                {
                  "ref": 13,
                  "name": "asie" 
                }
              ],
              "finale":true
            },
            {
              "idEntity":6,
              "message":"1466513470000",
              "prix":10,
              "white":true,
              "zone":[
                {
                  "ref": 12,
                  "name": "europe"  
                },
                {
                  "ref": 13,
                  "name": "asie" 
                }
              ],
              "finale":true
            },
            {
              "idEntity":6,
              "message":"1466513470000",
              "prix":10,
              "white":true,
              "zone":[
                {
                  "ref": 12,
                  "name": "europe"  
                },
                {
                  "ref": 13,
                  "name": "asie" 
                }
              ],
              "finale":true
            },
            {
              "idEntity":6,
              "message":"1466513470000",
              "prix":10,
              "white":true,
              "zone":[
                {
                  "ref": 12,
                  "name": "europe"  
                },
                {
                  "ref": 13,
                  "name": "asie" 
                }
              ],
              "finale":true
            }
          ];

        PropositionService.getProposition(product.product.dropshippers_ref).then(function(res) {
            console.log('res: ', res);
        });

        $scope.tableParams = new NgTableParams({
        count: 10,
        sorting: {idEntity: "asc"}
      }, {
        counts: [],
        total: 0,
        getData: function (params) {
          return PropositionService.getProposition(product.product.dropshippers_ref).then(function(res) {

            console.log('res: ', res);
            var data = [];

            if (res.status != 200)
              return null;
            else {
              if (angular.isDefined(res.data.propositions.guest))
                angular.extend(data, res.data.propositions.guest);
              if (angular.isDefined(res.data.propositions.host))
                angular.extend(data, res.data.propositions.host);
            }

            var filteredData = params.filter() ?
                  $filter('filter')(data, params.filter()) :
                  data;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                filteredData;
            params.total(orderedData.length);
            return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
          });
        },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
      });

      }
    ]
  );