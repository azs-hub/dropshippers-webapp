angular.module('profile.model', ['profile.service'])
  .factory('ProfileModel', function (ProfileService) {
    
    function profileModelFactory () {

      this.user = {};
      this.products = [];
      this.shops = [];

      var self = this;

      this.loadUser = function (userId) {
        if (!userId) {
          ProfileService.getUser().then(function (res) {
            if (res.status == 200) {
              self.user = res.data.currentUser.user;
              self.shop = res.data.currentUser.shop;
            }
            console.log('user res : ', res);
            
          });
        }
      };

      this.getUser = function () {
        return self.user;
      };

      this.reset = function(userId) {
        loadUser(userId);
      };

      this.clean = function() {
        this.user = {};
        this.products = [];
        this.shops = [];
      };

    }

    return new profileModelFactory();
  });