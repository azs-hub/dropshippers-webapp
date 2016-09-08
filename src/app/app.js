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
    'satellizer',
    'mm.acl'])

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

    .factory('SatellizerInterceptor', [
      '$q',
      'SatellizerConfig',
      'SatellizerStorage',
      'SatellizerShared',
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
      }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('SatellizerInterceptor');
    }])
    .config( ['$stateProvider', '$urlRouterProvider', '$authProvider', 'BASE_URL_API',
        function($stateProvider, $urlRouterProvider, $authProvider, BASE_URL_API) {
            $urlRouterProvider.otherwise('/');

            $authProvider.baseUrl = BASE_URL_API;
            $authProvider.loginUrl = "login/signin";
            $authProvider.tokenName = "token";
            $authProvider.authHeader = "token";
            $authProvider.tokenHeader = "token";

            $stateProvider
              .state('login', {
                url: '/login',
                templateUrl: 'app/auth/login.html',
                controller: 'AuthController',
                resolve : {
                  'acl' : ['$q', 'AclService', function($q, AclService){
                    if(AclService.can('view_content')){
                      // Has proper permissions
                      return true;
                    } else {
                      // Does not have permission
                      return $q.reject('Unauthorized');
                    }
                  }]
                }
              })
              .state('home', {
                url: '/',
                views: {
                  'full': {
                    templateUrl: 'app/home/index.html',
                    controller: 'HomeController'
                  }
                },
                resolve : {
                  'acl' : ['$q', 'AclService', function($q, AclService){
                    if(AclService.can('view_content')){
                      // Has proper permissions
                      return true;
                    } else {
                      // Does not have permission
                      return $q.reject('Unauthorized');
                    }
                  }]
                }
              })
              .state('products', {
                url: '/products',
                templateUrl: 'app/product/products.html',
                controller: 'ProductsController',
                resolve : {
                  'acl' : ['$q', 'AclService', function($q, AclService){
                    if(AclService.can('view_ds')){
                      // Has proper permissions
                      return true;
                    } else {
                      // Does not have permission
                      return $q.reject('Unauthorized');
                    }
                  }]
                }
              })
              .state('myproduct', {
                url: '/myproducts',
                templateUrl: 'app/product/products.html',
                controller: 'MyProductsController',
                resolve : {
                  'acl' : ['$q', 'AclService', function($q, AclService){
                    if(AclService.can('view_ds')){
                      // Has proper permissions
                      return true;
                    } else {
                      // Does not have permission
                      return $q.reject('Unauthorized');
                    }
                  }]
                }
              })
              .state('propositions', {
                url: '/propositions',
                templateUrl: 'app/propositions/index.html',
                controller: 'PropositionsController',
                resolve : {
                  'acl' : ['$q', 'AclService', function($q, AclService){
                    if(AclService.can('view_ds')){
                      // Has proper permissions
                      return true;
                    } else {
                      // Does not have permission
                      return $q.reject('Unauthorized');
                    }
                  }]
                }
              })
              .state('signin', {
                url: '/signin',
                templateUrl: 'app/auth/signin.html',
                controller: 'SigninController',
                resolve : {
                  'acl' : ['$q', 'AclService', function($q, AclService){
                    if(AclService.can('view_content')){
                      // Has proper permissions
                      return true;
                    } else {
                      // Does not have permission
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
                        if(AclService.can('view_content')){
                          // Has proper permissions
                          return true;
                        } else {
                        // Does not have permission
                          return $q.reject('Unauthorized');
                        }
                      }]
                    }
                  }}
                })
                .state('detailProduct', {
                  url: '/product/:id',
                  templateUrl: 'app/product/product.html',
                  controller: 'ProductController',
                  resolve: {
                    'acl' : ['$q', 'AclService', function($q, AclService){
                          if(AclService.can('view_content')){
                          // Has proper permissions
                          return true;
                          } else {
                          // Does not have permission
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
    }])
    .run(['AclService',
          function (AclService) {
            console.log('---->', AclService.resume());
              if (!AclService.resume()) {
                var aclData = {
                    GUEST: ['view_content'],
                    MEMBER: ['logout', 'view_ds'],
                    ADMIN: ['logout', 'view_ds', 'view_admin']
                };
                AclService.setAbilities(aclData);
                AclService.attachRole('GUEST');
              }

    }])
    .run( ['$rootScope', '$auth',
      function ($rootScope, $auth) {
        //$rootScope.isAuthenticated = $auth.isAuthenticated();

        if ($auth.isAuthenticated()) {
          AclService.flushRoles();
          AclService.attachRole('MEMBER');
        }

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {

          //var signupState = ['signin', 'login', 'home', 'about'];

          // Authenticated user
          //if (!$auth.isAuthenticated())
          //{
            //console.log('here');
            // Asked route is "sign in" or "sign up" forms
            //if (_.indexOf(signupState, toState.name) == -1) {
              //$rootScope.$emit('auth:logout');
            //}
          //}
        });
      }
    ]);
