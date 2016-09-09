'use strict';

angular.module('dropshippers')
  .controller('ProductController',
              ['$scope', '$auth', 'product', 'PropositionService', 'PropositionModel', 'ProfileModel', 'NgTableParams', '$filter', '$mdToast',
               function ($scope, $auth, product, PropositionService, PropositionModel, ProfileModel, NgTableParams, $filter, $mdToast) {

        $scope.product = product.product;
        $scope.proposition = {};
        $scope.propositions = PropositionModel;
        PropositionModel.load();
        $scope.user = ProfileModel;
        ProfileModel.loadUser();

        $scope.accept_props = function (id) {
          var data = [{ "op": "replace", "path" : "/status", "value" : "accepted"}];
          PropositionService.active(id, data).then(function(res) {
            //if (res.status == 200)

          });
          console.log("hey marc");
        };

        var proposition = {
          product_reference: product.product.dropshippers_ref,
          quantity: 1,
          deliveryArea: 'all'
        };

        var resetProp = function() {
          $scope.proposition = {};
        }

        $scope.props = function () {
            angular.extend(proposition, $scope.proposition);
            PropositionService.addProposition(proposition).then(function(res) {
            if (res.status == 200) {
              $scope.propositions.propositions.push(proposition);
              $scope.proposition = {};
              resetProp();
                $scope.tableParams.reload();
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Proposition bien envoyé')
                );
            } else {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Erreur')
                    .hideDelay(3000)
                );
            }

          });
        };

        $scope.tableParams = new NgTableParams({
          count: 10,
          sorting: {date: "asc"}
        }, {
          counts: [],
          total: 0,
          getData: function (params) {

            return PropositionService.getProposition(product.product.dropshippers_ref).then(function(res) {

              if (res.status != 200)
                return null;
              else if (res.data.propositions.length > 0) {
                var filteredData = params.filter() ?
                      $filter('filter')(res.data.propositions,  params.filter()) :
                      res.data.propositions;
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    filteredData;
                params.total(orderedData.length);
                return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
              }
            });
          },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
        });

      }
    ]
  );
