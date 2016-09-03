angular.module('navbar.controller', [])
    .controller("NavbarController", ['$scope', '$state', '$auth',
        function ($scope, $state, $auth) {
            $scope.isAuthenticated = $auth.isAuthenticated();
        	$scope.$state = $state;

        	$scope.showLogo = function (stateName) {
        		if (stateName != "login" && stateName != "signin")
        			return true;
        		return false;
        	}

        	$scope.logout = function () {
        		$auth.logout();
        	}

        	
        }]);
