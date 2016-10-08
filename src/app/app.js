'use strict';

angular.module('dropshippers', [
  'local.config',
  'profile',
  'proposition',
  'auth',
  'product',
  'navbar',
  'ui.router',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'ngLodash',
  'ngTable',
  'toastr',
  'bw.paging',
  'satellizer',
  'pascalprecht.translate',
  'mm.acl'])

  // config theme material
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
        'default': '500',
        'hue-1':   '200'
    })
    .accentPalette('amber', {
        'default': 'A400'
    });
  })

  // config Satellizer auth
  .factory('SatellizerInterceptor', [
    '$q', 'SatellizerConfig', 'SatellizerStorage', 'SatellizerShared',
    function($q, config, storage, shared) {
      return {
        request: function(request) {
          if (request.skipAuthorization) {
            return request;
          }
          if (shared.isAuthenticated() && config.httpInterceptor(request)) {
            request.headers["token"] = storage.get("satellizer_token");
          }
          return request;
        },
        responseError: function(response) {
          return $q.reject(response);
        }
      };
    }
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('SatellizerInterceptor');
  }])

  // config des routes
  .config( ['$stateProvider', '$urlRouterProvider', '$authProvider', 'BASE_URL_API', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $authProvider, BASE_URL_API, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $authProvider.baseUrl     = BASE_URL_API;
    $authProvider.loginUrl    = "login/signin";
    $authProvider.tokenName   = "token";
    $authProvider.authHeader  = "token";
    $authProvider.tokenHeader = "token";

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller:  'AuthController',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService) {
            if(AclService.can('view_content')) {
                return true;
            } else {
                return $q.reject('Unauthorized');
            }
          }]
        }
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.html',
        controller:  'SigninController',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService){
            if(AclService.can('view_content')) {
                return true;
            } else {
                return $q.reject('Unauthorized');
            }
          }]
        }
      })
      .state('about', {
        url: '/about',
        views: {
          'full': {
            templateUrl: 'app/about/about.html',
            resolve : {
              'acl' : ['$q', 'AclService', function($q, AclService){
                if(AclService.can('view_content')) {
                    return true;
                } else {
                    return $q.reject('Unauthorized');
                }
              }]
            }
          }}
      })
      .state('home', {
        url: '/',
        views: {
          'full': {
            templateUrl: 'app/home/index.html',
            controller:  'HomeController'
          }
        },
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService) {
            if(AclService.can('view_content')) {
                return true;
            } else {
                return $q.reject('Unauthorized');
            }
          }]
        }
      })
      .state('myaccount', {
        url: '/myaccount',
        templateUrl: 'app/profile/myaccount.html',
        controller:  'ProfileController',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService) {
            if(AclService.can('view_ds')) {
                return true;
            } else {
                return $q.reject('Unauthorized');
            }
          }]
        }
      })
      .state('products', {
        url: '/products',
        templateUrl: 'app/product/products.html',
        controller:  'ProductsController',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService) {
            if(AclService.can('view_ds')) {
                return true;
            } else {
                return $q.reject('Unauthorized');
            }
          }]
        }
      })
      .state('propositions', {
        url: '/propositions',
        templateUrl: 'app/propositions/propositions.html',
        controller:  'PropositionsController',
        resolve : {
          'acl' : ['$q', 'AclService', function($q, AclService) {
            if(AclService.can('view_ds')) {
              // Has proper permissions
              return true;
            } else {
              // Does not have permission
              return $q.reject('Unauthorized');
            }
          }]
        }
      })
      .state('detailProduct', {
        url: '/product/:id',
        templateUrl: 'app/product/product.html',
        controller:  'ProductController',
        resolve: {
          'acl' : ['$q', 'AclService', function($q, AclService) {
                if(AclService.can('view_ds')) {
                    return true;
                } else {
                    return $q.reject('Unauthorized');
              }
            }],
          product: function($stateParams, ProductService) {
            console.log($stateParams);
            return ProductService.getProduct($stateParams.id).then(function(res) {
              return res.data;
            });
          }
        }
      });
      $locationProvider.html5Mode(true);
  }])

  // toastr config
  .config(function (toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: false,
      containerId: 'toast-container',
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      preventOpenDuplicates: true,
      target: 'body',

      allowHtml: false,
      closeButton: false,
      closeHtml: '<button>&times;</button>',
      extendedTimeOut: 1000,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },
      messageClass: 'toast-message',
      onHidden: null,
      onShown: null,
      onTap: null,
      progressBar: true,
      tapToDismiss: true,
      templates: {
        toast: 'directives/toast/toast.html',
        progressbar: 'directives/progressbar/progressbar.html'
      },
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
  })

  // Interceptor config
  .config(function ($httpProvider) {
    
    function authInterceptor($rootScope) {
      return {
        responseError: function (rejection) {
          // 403 or 401: logout
          console.log('response error', rejection);
          if (403 === rejection.status && angular.isDefined(rejection.data) && rejection.data.code != 10001 || (401 === rejection.status && 'ERR_FUNC_ACCESS_DENIED' === rejection.data.code) || -1 === rejection.status || (500 === rejection.status && 'ERR_FUNC_INVALID_TOKEN' === rejection.data.code)) {
            $rootScope.$emit('auth:error', rejection);
          }
          else if (rejection.status !== 401 && rejection.status < 600 && rejection.status > 400) {
            // show toastr error if isset tanslation for code error
            $rootScope.$emit('http:error', rejection);
          }

          return rejection;
        }
      }
    }
    $httpProvider.interceptors.push(authInterceptor);
  })

  // Translate config
  .config(function ($translateProvider, $translatePartialLoaderProvider) {
    
    
    $translateProvider.preferredLanguage('fr');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useLoaderCache(true);

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/components/infrastructure/translate/{lang}/{part}.json'
    });
    $translatePartialLoaderProvider.addPart('general');
  })
  
  // Config Acl role
  .run(['AclService',
    function (AclService) {
      if (!AclService.resume()) {
        var aclData = {
            GUEST:  ['view_content'],
            MEMBER: ['logout', 'view_ds'],
            ADMIN:  ['logout', 'view_ds', 'view_admin']
        };
        AclService.setAbilities(aclData);
        AclService.attachRole('GUEST');
      }

  }])

  // app run
  .run( ['$rootScope', '$auth', '$filter', 'AclService', 'toastr',
    function ($rootScope, $auth, $filter, AclService, toastr) {
      if ($auth.isAuthenticated()) {
        AclService.flushRoles();
        AclService.attachRole('MEMBER');
      }

      // auth error logout
      $rootScope.$on("auth:error", function (event, err) {
        console.log('auth:error entered');
        $rootScope.$broadcast('auth:logout');
        if(err && (err.status == 403 || err.status == -1)) {
          toastr.error($filter('translate')('HTTP_403'));
        } else {
          toastr.error($filter('translate')('HTTP_401'));
        }
        event.preventDefault();
      });
      
      // show toastr error
      $rootScope.$on("http:error", function (event, err) {
        if(err && angular.isDefined(err.data) && err.data !== null && angular.isDefined(err.data.code) && err.data.code !== null
        && $filter('translate')(err.data.code) !== err.data.code) {
          toastr.error($filter('translate')('CODE.' + err.data.code));
        }
        event.preventDefault();
      });

      // load partial on loaded
      $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
      });
    }
  ]);
