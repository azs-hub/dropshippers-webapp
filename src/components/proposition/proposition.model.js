angular.module('proposition.model', ['proposition.service'])
  .factory('PropositionModel', function (PropositionService, $q) {
    
    function propositionModelFactory () {

      this.propositions = null;
      
      var self = this;

      this.load = function () {
        if (!self.propositions) {
          PropositionService.getPropositions().then(function (res) {
            console.log('res.data', res);
            if (res.status == 200) {
              console.log('res.data', res.data);
              self.propositions = res.data.propositions;
            }
          });
        }
      };

      this.getAll = function () {
        return self.propositions;
      };

      this.get = function (idProduit) {
        return self.propositions[idProduit];
      };

      this.reset = function(userId) {
        load();
      };

      this.clean = function() {
        self.propositions = null;
      };
    }

    return new propositionModelFactory();
  });