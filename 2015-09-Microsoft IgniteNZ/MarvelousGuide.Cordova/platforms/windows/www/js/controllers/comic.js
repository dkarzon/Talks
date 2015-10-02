angular.module('marvelous.controllers')
.controller('ComicCtrl', function ($scope, $stateParams, $apiService, $loadingService) {

    //get the character here
    $loadingService.show();
    var comicId = $stateParams.comicId;
    var comicData;

    $apiService.getComic(comicId).success(function (response) {
        comicData = response.data.results[0];
        $loadingService.hide();

        if (!comicData) {
            //TODO - where's ma data?
            return;
        }

        $scope.comic = comicData;
    });

});
