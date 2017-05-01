angular.module('profile.service', [])
  .service('ProfileService',
    ['$rootScope', '$q', '$log', '$http', 'BASE_URL_API',
    function ($rootScope, $q, $log, $http, BASE_URL_API) {
      return {
        register: function(datas) {
          $log.debug('Profile:register', datas);
          $http({
            method: 'POST',
            url: BASE_URL_API + 'login/register',
            data: datas
          })
          .then(function successCallback(response) {
            return response;
          });
        },
        getUser: function() {
          $log.debug('Profile:getUser');
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/user'
          })
          .then(function successCallback(response) {
            if (response.status === 200)
              return response.data[0];
            else
              $rootScope.$emit('auth:error', response);
          });
        }
      };
    }
  ]
);