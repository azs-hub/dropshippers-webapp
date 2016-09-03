angular.module('navbar.controller', [])
    .controller("NavbarController", ['$scope', '$state',
        function ($scope, $state) {
            
            console.log($state.$current.toString(), $state.current);
        	$scope.$state = $state;

        	$scope.showLogo = function (stateName) {
        		if (stateName != "login" && stateName != "signin")
        			return true;
        		return false;
        	}
        }]);
