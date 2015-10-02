angular.module('marvelous.controllers')
.controller('DonateCtrl', function ($scope, $rootScope, $apiService, $ionicLoading) {

    $rootScope.$on('purchase', function (event, args) {
        $scope.$apply(function () {
            $scope.message = args;
        });
    });

    $scope.doDonate1 = function () {
        store.order("donate_1");
    };
    $scope.doDonate2 = function () {
        store.order("donate_2");
    };

});
