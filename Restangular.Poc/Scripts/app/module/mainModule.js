var mainModule = angular.module('mainModule', ['restangular']);


mainModule.factory('tokenHttpInterceptor', function ($q) {
    return {

        'request': function (config) {
            var credentials = btoa('sumit@3pillarglobal.com:password');
            config.headers.Authorization = 'Basic ' + credentials;
            return config || $q.when(config);
        }//,

        //'requestError': function (rejection) {
        //    if (canRecover(rejection)) {
        //        return responseOrNewPromise
        //    }
        //    return $q.reject(rejection);
        //},


        //'response': function (response) {
        //    //TODO: do something on success
        //    return response || $q.when(response);
        //},

        //'responseError': function (rejection) {
        //    //TODO: do something on error
        //    if (canRecover(rejection)) {
        //        return responseOrNewPromise
        //    }
        //    return $q.reject(rejection);
        //}

    };
});



mainModule.config(function ($routeProvider, $locationProvider, $httpProvider, RestangularProvider) {
    $routeProvider.when('/Restangular-demo', { templateUrl: 'views/productList.html', controller: 'productsRestFullController' })
        .when('/new', { templateUrl: 'views/AddOrEdit.html', controller: 'CreateCtrl' })
        .when('/edit/:projectId', {
            controller: EditCtrl, templateUrl: 'views/AddOrEdit.html', resolve: {
                project: function (Restangular, $route) {
                    return Restangular.one('products', $route.current.params.projectId).get();
                }
            }
        })
        .otherwise({ redirectTo: '/Restangular-demo' });
    $httpProvider.interceptors.push('tokenHttpInterceptor');
    RestangularProvider.setBaseUrl('http://ndi-pc-383:8282/api');
    var credentials = btoa('sumit@3pillarglobal.com:password');
    RestangularProvider.setDefaultHeaders({ "Authorization": 'Basic ' + credentials });
    RestangularProvider.setRestangularFields({
        id: 'Id'
    });
});


