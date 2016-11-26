angular.module('proposition.service', [])
  .service('PropositionService',
    ['$q', '$log', '$http', 'BASE_URL_API',
    function ($q, $log, $http, BASE_URL_API) {
      // var self = this;

      // Public API here
      return {
        getPropositions: function() {
          $log.debug('Proposition:getPropositions');
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/user/propositions',
              }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response.data;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        getProposition: function(id) {
          $log.debug('Proposition:getProposition', id);
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/user/propositions/' + id + '/messages'
          }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        addProposition: function(values) {
          $log.debug('Proposition:Proposition', values);
          console.log(BASE_URL_API);
          return $http({
            method: 'POST',
            url: BASE_URL_API + 'front/user/partners/products/proposition',
            data: values
          }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        active: function(id, data) {
          $log.debug('Proposition:active', id, data);
          return $http({
            method: 'PATCH',
            url: BASE_URL_API + 'front/user/propositions/' + id,
            data: data
          }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        getZones: function() {
          $log.debug('Proposition:getZones');
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/common/zones'
          }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        }
      };
    }
  ]
);