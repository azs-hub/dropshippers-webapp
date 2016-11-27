'use strict';

angular.module('dropshippers')
  .controller('ProductController',
              ['$scope', '$auth', 'product', 'PropositionService', 'ProfileModel', 'NgTableParams', '$filter', '$mdToast', 'propositions', 'zoneList',
               function ($scope, $auth, product, PropositionService, ProfileModel, NgTableParams, $filter, $mdToast, propositions, zoneList) {

        $scope.product = product;
        // var proposition = {};
        $scope.propositionMsg = {};
        // je trie les props par date
        $scope.propositions = _.reverse(_.sortBy(propositions, ['created_at']));
        // je recupere la props en cours
        $scope.waitingProp = _.find($scope.propositions, ['status', 'new']);

        $scope.zones = zoneList.zones;
        $scope.user = ProfileModel;
        ProfileModel.loadUser();

        console.log('propositions = ', $scope.propositions);
        console.log('waitingProp = ', $scope.waitingProp);
        console.log('user = ', $scope.user);

        // $scope.lastProposition = _.sortBy($scope.propositions.messages, ['created_at'])[$scope.propositions.messages.length-1];
        

        $scope.accept_props = function () {
          var data = [{ "op": "replace", "path" : "/status", "value" : "accepted"}];
          PropositionService.active($scope.waitingProp.requestRef, data).then(function(res) {
            //if (res.status == 200)

          });
        };

        var resetProp = function() {
          $scope.proposition = {};
        }

        $scope.props = function () {
            var proposition = $scope.propositionMsg;
            proposition.isSendDirectly = (proposition.isSendDirectly == "true") ? true : false;
            proposition.isWhiteMark = (proposition.isWhiteMark == "true") ? true : false;
            
            if (!$scope.waitingProp) {
              proposition.quantity = 1;
              proposition.product_reference = product.dropshippers_ref;
              PropositionService.addProposition(proposition).then(function(res) {
                console.log('res : ', res);
              });
            } else {
              delete proposition.deliveryArea;
              PropositionService.addMessage($scope.waitingProp.requestRef, proposition).then(function(res) {
                console.log('res : ', res);
              });
            }
        };

        $scope.tablePropositions = new NgTableParams({
          count: 30,
          sorting: {created_at: "asc"}
        }, {
          counts: [],
          total: 0,
          getData: function (params) {

            var filteredData = params.filter() ?
                      $filter('filter')($scope.propositions,  params.filter()) :
                      $scope.propositions;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    filteredData;
            params.total(orderedData.length);
            return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
          },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
        });

        $scope.tableParams = new NgTableParams({
          count: 30,
          sorting: {created_at: "asc"}
        }, {
          counts: [],
          total: 0,
          getData: function (params) {

            var filteredData = params.filter() ?
                      $filter('filter')($scope.waitingProp.messages,  params.filter()) :
                      $scope.waitingProp.messages;
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
