angular.module('profile.service', [])
  .service('ProfileService',
    ['$q', '$log', '$http', 'BASE_URL_API',
    function ($q, $log, $http, BASE_URL_API) {
      // var self = this;

      // Public API here
      return {
        register: function(datas) {
          $log.debug('Profile:register', datas);
          $http({
            method: 'POST',
            url: BASE_URL_API + 'login/register',
            data: datas
          }).then(function successCallback(response) {
              //console.log("successCallback : ", response);
              return response;
            }, function errorCallback(response) {
              console.log("errorCallback : ", response);
              return response;
            });
        },
        getUser: function() {
          $log.debug('Profile:getUser');
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/user'
          }).then(function successCallback(response) {
              //console.log("successCallback : ", response);
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