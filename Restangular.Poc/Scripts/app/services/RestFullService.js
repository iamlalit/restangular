mainModule.factory('RestFullService', function (Restangular) {
    return {
        getAllProducts: function () {
            var products = Restangular.one('Products');
            return products.getList();
        }
    };
});