'use strict';

angular.module('dropshippers')
  .controller('PropositionsController',
    ['$scope', '$state', 'PropositionService', 'NgTableParams',
      function ($scope, $state, PropositionService, NgTableParams) {

      	$scope.tableParams = new NgTableParams({
          count: 10,
          sorting: {idEntity: "asc"}
        }, {
          counts: [],
          total: 0,
          getData: function (params) {

            return PropositionService.getPropositions().then(function(res) {

              if (res.status != 200)
                return null;
              else {
              	console.log('res all ', res);
                // var filteredData = params.filter() ?
                //       $filter('filter')(res.data.propositions[product.product.dropshippers_ref],  params.filter()) :
                //       res.data.propositions[product.product.dropshippers_ref];
                // var orderedData = params.sorting() ?
                //     $filter('orderBy')(filteredData, params.orderBy()) :
                //     filteredData;
                // params.total(orderedData.length);
                // return orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
              }
            });
          },
        paginationMaxBlocks: 5,
        paginationMinBlocks: 2
        });
        
      }
    ]
  );