'use strict';

angular.module('dropshippers')
  .controller('ProductController',
              ['$scope', '$auth', 'product', 'PropositionService', 'NgTableParams', '$filter', '$mdToast',
               function ($scope, $auth, product, PropositionService, NgTableParams, $filter, $mdToast) {

        $scope.product = product.product;
        $scope.propositions = [];

        var proposition = {
          product_reference: product.product.dropshippers_ref,
          quantity: 1,
          deliveryArea: 'all'
        };

        var resetProp = function() {
          $scope.proposition = {};
        }
        //initProp();

        $scope.props = function () {
          angular.extend(proposition, $scope.proposition);
          PropositionService.addProposition(proposition).then(function(res) {
            if (res.status == 200) {
              $scope.propositions.push(proposition);
              $scope.proposition = {};
              resetProp();
                $scope.tableParams.reload();
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Proposition bien envoyé')
                );
              // toast succes
            } else {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Erreur')
                    .hideDelay(3000)
                );
              // toastr erreur
            }

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
            //$scope.propositions = au data
        });

        $scope.tableParams = new NgTableParams({
        count: 10,
        sorting: {idEntity: "asc"}
      }, {
        counts: [],
        total: 0,
        getData: function (params) {

          // return PropositionService.getProposition(product.product.dropshippers_ref).then(function(res) {

          //   console.log('res: ', res);
          //   var data = [];

          //   if (res.status != 200)
          //     return null;
          //   else {
          //     if (angular.isDefined(res.data.propositions.guest))
          //       angular.extend(data, res.data.propositions.guest);
          //     if (angular.isDefined(res.data.propositions.host))
          //       angular.extend(data, res.data.propositions.host);
          //   }

          console.log('---->', $scope.propositions);

            var filteredData = params.filter() ?
                  $filter('filter')($scope.propositions,  params.filter()) :
                  $scope.propositions;
            var orderedData = params.sorting() ?
                $filter('orderBy')(filteredData, params.orderBy()) :
                filteredData;
            params.total(orderedData.length);
            return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
          // });
        },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
      });

      }
    ]
  );
