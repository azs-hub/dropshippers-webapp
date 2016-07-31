'use strict';

angular.module('wecommerceApp')
  .factory('ProductService',
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
        login: function(datas) {
          $log.debug('Auth:login', datas);
          return $http({
            method: 'POST',
            url: BASE_URL_API + 'login/signin',
            params: {
              username: datas.username,
              password: datas.password
            }
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