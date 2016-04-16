angular.module('wecommerceApp')  
.factory('Auth', function($http, $rootScope, $cookies){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookies.get('user') || 
                        { username: '', role: userRoles.public };

    $rootScope.accessLevels = accessLevels;
    $rootScope.userRoles = userRoles;

    return {
        authorize: function(accessLevel, role) {
            console.log('authorized : ', accessLevel, role, $rootScope.user, accessLevel & role);
            if (!$rootScope.user) {
                $rootScope.user = {
                    'username': null,
                    'role': userRoles.public
                };
            }

            if(role === undefined)
                role = $rootScope.user.role;
            return accessLevel & role;
        },

        isLoggedIn: function(user) {
            if(user === undefined)
                user = $rootScope.user;
            return user.role === userRoles.user || user.role === userRoles.admin;
        },

        register: function(user, success, error) {
            $http.post('/register', user).success(success).error(error);
        },

        login: function(user, success, error) {
            user.role = 2;
            $cookies.putObject('user', user);
            $rootScope.user = user;
            // $http.post('/login', user).success(function(user){
            //     $rootScope.user = user;
            //     success(user);
            // }).error(error);
        },

        logout: function(success, error) {
            $cookies.remove('user');
            $rootScope.user = {
                    'username': null,
                    'role': userRoles.public
                };
            // $http.post('/logout').success(function(){
            //     $rootScope.user = {
            //         'username': null,
            //         'role': userRoles.public
            //     };
            //     success();
            // }).error(error);
        },

        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});