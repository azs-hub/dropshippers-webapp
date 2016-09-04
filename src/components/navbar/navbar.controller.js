angular.module('navbar.controller', [])
    .controller("NavbarController", ['$rootScope', '$scope', '$state', '$auth',
        function ($rootScope, $scope, $state, $auth) {
            $scope.isAuthenticated = $auth.isAuthenticated();
        	$scope.$state = $state;

		    $rootScope.$on("auth:logout", function (event, err) {
	          	$auth.logout();
	          	$scope.isAuthenticated = $auth.isAuthenticated();
	          	$state.go('login');
	          	event.preventDefault();
	        });

	        $rootScope.$on("auth:loged", function (event, err) {
	          	$scope.isAuthenticated = $auth.isAuthenticated();
	          	event.preventDefault();
	        });


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
