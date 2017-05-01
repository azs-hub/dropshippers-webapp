angular.module('auth.service', [])
  .service('AuthService',
    ['$q', '$log', '$http', 'BASE_URL_API',
    function ($q, $log, $http, BASE_URL_API) {
      return {
        register: function(datas) {
          $log.debug('Auth:register', datas);
          return $http({
            method: 'POST',
            url: BASE_URL_API + 'login/register',
            data: datas
          })
          .then(function successCallback(response) {
            return response;
          });
        },
        login: function(datas) {
          $log.debug('Auth:login', datas);
          return $http({
            method: 'POST',
            url: BASE_URL_API + 'login/signin',
            data: {
              username: datas.username,
              password: datas.password
            }
          })
          .then(function successCallback(response) {
            return response;
          });
        }
      };
    }
  ]
);
