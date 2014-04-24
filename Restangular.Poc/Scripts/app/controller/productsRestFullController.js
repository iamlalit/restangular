mainModule.controller('productsRestFullController', function (RestFullService,$scope) {
    $scope.productsList = RestFullService.getAllProducts();
});

function CreateCtrl($scope, $location, Restangular) {
    $scope.save = function (myForm) {
        if (myForm.$valid) {
            Restangular.all('Products').post($scope.project).then(function (project) {
                $location.path('/Restangular-demo');
            });
        }
    }
}

function EditCtrl($scope, $location, Restangular, project) {
    var original = project;
    $scope.project = Restangular.copy(original);


    $scope.isClean = function () {
        return angular.equals(original, $scope.project);
    }

    $scope.destroy = function () {
        original.remove().then(function () {
            $location.path('/Restangular-demo');
        });
    };

    $scope.save = function (myForm) {
        if (myForm.$valid) {
            if (!angular.equals(original, $scope.project)) {
                $scope.project.put().then(function () {
                    $location.path('/Restangular-demo');
                });
            }
        }
    };
}