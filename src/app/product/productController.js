'use strict';

angular.module('dropshippers')
  .controller('ProductController',
    ['$scope', '$auth', 'product', 'PropositionService', 'NgTableParams',
      function ($scope, $auth, product, PropositionService, NgTableParams) {
        $scope.user = {
          isAuth: $auth.isAuthenticated()
        };

        $scope.product = product.product;

        $scope.props = function () {
          PropositionService.addProposition($scope.product.dropshippers_ref).then(function(res) {
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

        $scope.tableParams = new NgTableParams({
        count: 10,
        sorting: {idEntity: "asc"}
      }, {
        counts: [],
        total: 0,
        getData: function (params) {
          var filteredData = params.filter() ?
                  $filter('filter')(messages, params.filter()) :
                  messages;
              var orderedData = params.sorting() ?
                  $filter('orderBy')(filteredData, params.orderBy()) :
                  filteredData;
              params.total(orderedData.length);
              return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
      });

      }
    ]
  );