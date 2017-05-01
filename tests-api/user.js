var chakram = require('chakram'),
    expect = chakram.expect;

var api = {
	url: 'http://api.dropshippers.io/v1',
	email: 'bikiniTest@gmail.com',
	shop_name: 'bikiniTest',
	username: 'bikini',
	password: 'bikini'
};
var params = {
	headers: {
		token: 'Ex1O24KdTM7osv02jFFmff0R45omWubA2dp4i9hbVpzoUAreg6BwlBnqHLMDgYeibDmtNEFJ3f8YQzc6GNC2pZt7LfK1dZkpDGTq'
	}
};

describe("Test User connection", function() {
    it("should register user", function () {
    	var data = {
    		username: api.username,
    		email: api.email,
    		shop_name: api.shop_name,
    		password: api.password
    	};
    	chakram.post(api.url + "/login/register", data)
    	.then(function(result) {
    		return expect(result).to.have.status(200);
    	});
    });

    it("should connect user", function () {
    	var data = {
    		username: api.username,
    		password: api.password
    	};
    	chakram.post(api.url + "/login/signin", data)
    	.then(function(result) {
    		
			if (result.response.statusCode === 200 && result.response.body.token) {
    			params.headers.token = result.response.body.token;
    		}
    		return expect(result).to.have.status(200);
    	});
    });

    it("should get user informations", function () {
    	 var result = chakram.get(api.url + "/front/user", params);
    	 return expect(result).to.have.status(200);
    });

    it("should get user propositions", function () {
    	 var result = chakram.get(api.url + "/front/user/propositions", params);
    	 return expect(result).to.have.status(200);
    });

    it("should get my product", function () {
    	 var result = chakram.get(api.url + "/ps/16/products", params);
    	 return expect(result).to.have.status(200);
    });
});

describe("Test Products and categories", function() {

	it("should get category", function () {
    	 var result = chakram.get(api.url + "/front/common/categories/fr-FR", params);
    	 return expect(result).to.have.status(200);
    });

    it("should get all products", function () {
    	 var result = chakram.get(api.url + "/front/common/products", params);
    	 return expect(result).to.have.status(200);
    });

    it("should get a specific product", function () {
    	 var result = chakram.get(api.url + "/front/common/products/12", params);
    	 return expect(result).to.have.status(200);
    });

});

describe("Test Partnership", function() {

	it("should active partnership", function () {
		var data = [{ "op": "replace", "path" : "/status", "value" : "new"}];
    	return chakram.patch(api.url + "/front/user/propositions/" + 10990, data, params)
    	.then(function (result) {
    		// console.log('------>', result);
    		return expect(result).to.have.status(200);
    	});
    });

    // it("should get all products", function () {
    // 	 var result = chakram.get(api.url + "/front/common/products", params);
    // 	 return expect(result).to.have.status(200);
    // });

    // it("should get a specific product", function () {
    // 	 var result = chakram.get(api.url + "/front/common/products/12", params);
    // 	 return expect(result).to.have.status(200);
    // });

});
