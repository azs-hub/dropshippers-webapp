'use strict';

angular.module('wecommerceApp')
  .factory('AuthService',
    ['$q', '$log', '$http', 'BASE_URL_API',
    function ($q, $log, $http, BASE_URL_API) {
      // var self = this;

      // Public API here
      return {
        register: function(datas) {
          $log.debug('Auth:register', datas);
          $http({
            method: 'POST',
            url: BASE_URL_API + 'login/register',
            data: datas
          }).then(function successCallback(response) {
              console.log("successCallback : ", response);
              return response;
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