'use strict';

angular.module('dropshippers')
  .controller('PropositionsController',
    ['$scope', '$state', 'PropositionService',
      function ($scope, $state, PropositionService) {

      	PropositionService.getPropositions().then(function(res) {
            console.log('res: ', res);
        });
        
      }
    ]
  );