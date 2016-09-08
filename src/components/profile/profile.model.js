angular.module('profile.model', ['profile.service'])
  .factory('ProfileModel', function (ProfileService, ProductService) {
    
    function profileModelFactory () {

      this.user = null;
      this.products = null;
      this.shops = null;
      this.currentShop = null;

      var self = this;

      this.loadUser = function (userId) {
        if (!userId && !self.user) {
          ProfileService.getUser().then(function (res) {
            if (res.status == 200) {
              self.user = res.data.currentUser.user;
              self.shops = [res.data.currentUser.shop];
              self.currentShop = res.data.currentUser.shop;

              ProductService.getMyProducts().then(function(res) {
                self.products = res.local;
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
        this.user = null;
        this.products = null;
        this.shops = null;
      };
    }

    return new profileModelFactory();
  });