angular.module('product.service', [])
  .service('ProductService',
    ['$q', '$log', '$http', 'BASE_URL_API',
    function ($q, $log, $http, BASE_URL_API) {
      // var self = this;

      // Public API here
      return {
        getProducts: function() {
          $log.debug('Product:getProducts');
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/common/products',
              }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response.data;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        getMyProducts: function() {
          $log.debug('Product:getProducts');
          return $http({
              method: 'GET',
              url: BASE_URL_API + 'ps/16/products',
            }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response.data;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        getProduct: function(id) {
          $log.debug('Product:getProduct', id);
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/common/products/'+ id
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