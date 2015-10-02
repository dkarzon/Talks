angular.module('marvelous.controllers')
.controller('CharacterCtrl', function ($scope, $stateParams, $apiService, $loadingService) {

    //get the character here
    $loadingService.show();
    var characterId = $stateParams.characterId;
    var characterData;

    $apiService.getCharacter(characterId).success(function (response) {
        characterData = response.data.results[0];
        $loadingService.hide();

        if (!characterData) {
            //TODO - where's ma data?
            return;
        }

        $scope.character = characterData;
    });

});
