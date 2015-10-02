angular.module('marvelous.controllers')
.controller('CharactersCtrl', function ($scope, $apiService, $loadingService) {

    //get the list of characters here
    $loadingService.show();
    $scope.characters = [];
    getCharacters(0, 100);

    $scope.clearSearch = function () {
        $scope.search = '';
    };
    

    function getCharacters(offset, limit) {
        $apiService.getCharacters(offset, limit).success(function (response) {
            for (var i = 0; i < response.data.results.length; i++) {
                $scope.characters.push(response.data.results[i]);
            }
            if (response.data.offset + response.data.limit < Math.min(response.data.total, 400)) {
                getCharacters(response.data.offset + response.data.limit, limit);
            }
            else {
                $loadingService.hide();
            }
        })
        .error(function (e) {
            $loadingService.showError();
        });
    };

})

.filter('searchCharacters', function () {
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
