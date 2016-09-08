'use strict';

angular.module('dropshippers')
  .controller('PropositionsController',
    ['$scope', '$state', '$filter', 'PropositionService', 'NgTableParams',
      function ($scope, $state, $filter, PropositionService, NgTableParams) {

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
              	
              	var data = [];

              	for (var i in res.data.propositions) {
              		_.sortBy(res.data.propositions[i], function(o) { return o.updated_at; })
              		data.push(res.data.propositions[i][0]);
              	}

                var filteredData = params.filter() ?
                      $filter('filter')(data,  params.filter()) :
                      data;
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