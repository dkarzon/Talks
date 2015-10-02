angular.module('marvelous.services')
.factory('$apiService', function ($http) {

    var __apiBaseUrl = "http://gateway.marvel.com:80/v1/public/";
    var __apiKey = "eca4f597e4ba334402d098b4809ef9ca";
    var __apiPrivate = "68d017e3cf4ce8b72128c18caf66dd817706c60f";

    var __ts = 1;

    function __getAuthParams() {
        var thisTs = __ts;
        __ts++;
        var hash = CryptoJS.MD5(thisTs + __apiPrivate + __apiKey);
        return "apikey=" + __apiKey + "&ts=" + thisTs + "&hash=" + hash;
    }


    function _getCharacters(offset, limit) {
        if (!limit || limit > 100) {
            limit = 100;
        }
        if (!offset) {
            offset = 0;
        }
        return $http.get(__apiBaseUrl + "characters?limit=" + limit + "&offset=" + offset + "&" + __getAuthParams());
    };

    function _getCharacter(id) {
        return $http.get(__apiBaseUrl + "characters/" + id + "?" + __getAuthParams());
    };

    function _getComic(id) {
        return $http.get(__apiBaseUrl + "comics/" + id + "?" + __getAuthParams());
    };


    return {
        getCharacters: _getCharacters,
        getCharacter: _getCharacter,
        getComic: _getComic
    };
});