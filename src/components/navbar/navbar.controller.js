angular.module('navbar.controller', [])
    .controller("NavbarController", ['$rootScope', '$scope', '$state', '$auth', '$translatePartialLoader', 'AclService', 'ProfileModel',
        function ($rootScope, $scope, $state, $auth, $translatePartialLoader, AclService, ProfileModel) {
            $translatePartialLoader.addPart('navbar');
            $scope.isAuthenticated = $auth.isAuthenticated();
            $scope.$state = $state;
            $scope.user = ProfileModel;

            $rootScope.$on("auth:logout", function (event, err) {
                $auth.logout();
                $scope.isAuthenticated = $auth.isAuthenticated();
                AclService.flushRoles();
                AclService.attachRole('GUEST');
                ProfileModel.clean();
                $state.go('login');
                event.preventDefault();
            });

            $rootScope.$on("auth:loged", function (event, err) {
                AclService.flushRoles();
                AclService.attachRole('MEMBER');
                $scope.isAuthenticated = $auth.isAuthenticated();
                ProfileModel.loadUser();
                event.preventDefault();
            });

            if ($scope.isAuthenticated) {
                ProfileModel.loadUser();
            }

            $scope.showLogo = function (stateName) {
                if (stateName != "login" && stateName != "signin")
                    return true;
                return false;
            }

            $scope.logout = function () {
                $scope.$emit('auth:logout');
            }

            $scope.go = function () {
                if ($scope.isAuthenticated)
                    $state.go('products');
                else
                    $state.go('home');
            }
        }]);
