angular.module('category.service', [])
  .service('CategoryService',
    ['$q', '$log', '$http', 'BASE_URL_API',
    function ($q, $log, $http, BASE_URL_API) {
      return {
        getAll: function() {
          $log.debug('Category:getAll');
          return $http({
            method: 'GET',
            url: BASE_URL_API + 'front/common/categories/fr-FR'
          })
          .then(function successCallback(response) {
            return response.data.categories;
          }, function errorCallback(response) {
            return response;
          });
        }
      };
    }
  ]
);
