angular.module('profile.model', ['profile.service'])
  .factory('ProfileModel', function (ProfileService, ProductService) {
    
    function profileModelFactory () {

      this.user = null;
      this.products = null;
      this.shop = null;

      var self = this;

      this.loadUser = function (userId) {
        if (!userId && !self.user) {
          ProfileService.getUser().then(function (res) {
            if (res.status == 200) {
              self.user = res.data.currentUser.user;
              self.shop = res.data.currentUser.shop;

              ProductService.getMyProducts().then(function(res) {
                self.products = res;
                console.log(res);
              });
            }
          });
        }
      };

      this.getUser = function () {
        return self.user;
      };

      this.getProducts = function () {
        return self.products;
      };

      this.reset = function(userId) {
        loadUser(userId);
      };

      this.clean = function() {
        self.user = null;
        self.products = null;
        self.shop = null;
      };
    }

    return new profileModelFactory();
  });