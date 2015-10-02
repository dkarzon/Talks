angular.module('marvelous.services')
.factory('$loadingService', function ($ionicLoading) {

    function _show() {
        $ionicLoading.show({
            templateUrl: 'templates/loading.html'
        });
    };

    function _hide() {
        $ionicLoading.hide();
    };

    function _showError() {
        $ionicLoading.show({
            template: 'ERROR'
        });
    };


    return {
        show: _show,
        hide: _hide,
        showError: _showError
    };
});