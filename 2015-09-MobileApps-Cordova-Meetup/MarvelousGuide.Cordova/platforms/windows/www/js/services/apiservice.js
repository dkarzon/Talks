angular.module('marvelous.services')
.factory('$apiService', function ($http) {

    var __apiBaseUrl = "http://gateway.marvel.com:80/v1/public/";
    var __apiKey = "d38b6794e3b02350e12765aee0c2d553";
    var __apiPrivate = "06db89148eb236d07042072c0f5ee0aa12def8c5";

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