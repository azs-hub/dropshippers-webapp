var app = angular.module('translate', ['pascalprecht.translate']);

app.config(function ($translateProvider) {
  $translateProvider.preferredLanguage('fr');
  $translateProvider.useSanitizeValueStrategy('escape');

  //"ERR_FUNC_EXISTING_ACCOUNT_FOR_TYPE"
  $translateProvider.translations('fr', {
    HTTP_401: 'Erreur d\'authentification, veuillez vous reconnecter.',
    HTTP_403: 'Le service est indisponible pour le moment, veuillez réessayer plus tard.'
  });

  $translateProvider.translations('en', {
    HTTP_401: 'Authentication error, please sign in again.',
    HTTP_403: 'Service unavailable. Please retry later',
  });
});
