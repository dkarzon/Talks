angular.module('marvelous.controllers')
.controller('ComicsCtrl', function ($scope, $apiService, $loadingService) {

    //get the list of characters here
    $loadingService.show();
    $scope.comics = [];
    getComics(0, 100);

    $scope.clearSearch = function () {
        $scope.search = '';
    };
    

    function getComics(offset, limit) {
        $apiService.getComics(offset, limit).success(function (response) {
            if (response && response.data && response.data.results) {
                for (var i = 0; i < response.data.results.length; i++) {
                    $scope.comics.push(response.data.results[i]);
                }
                $loadingService.hide();
            }
            else {
                $loadingService.hide();
            }
        })
        .error(function () {
            $loadingService.showError();
        });
    };

})

.filter('searchComics', function () {
    return function (items, query) {
        var filtered = [];
        var letterMatch = new RegExp(query, 'i');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (query) {
                if (letterMatch.test(item.name)) {
                    filtered.push(item);
                }
            } else {
                filtered.push(item);
            }
        }
        return filtered;
    };
});
