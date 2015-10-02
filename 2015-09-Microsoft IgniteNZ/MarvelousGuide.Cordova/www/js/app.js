// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('marvelous', ['ionic', 'marvelous.services', 'marvelous.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($ionicConfigProvider) {
    if (!ionic.Platform.isIOS()) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
    }
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })

    .state('app.comics', {
        url: '/comics',
        views: {
            'menuContent': {
                templateUrl: 'templates/comics.html'
            }
        }
    })
    .state('app.comic', {
        url: '/comic/:comicId',
        views: {
            'menuContent': {
                templateUrl: 'templates/comic.html',
                controller: 'ComicCtrl'
            }
        }
    })

    .state('app.camera', {
        url: '/camera',
        views: {
            'menuContent': {
                templateUrl: 'templates/camera.html',
                controller: 'CameraCtrl'
            }
        }
    })
    .state('app.characters', {
        url: '/characters',
        views: {
            'menuContent': {
                templateUrl: 'templates/characters.html',
                controller: 'CharactersCtrl'
            }
        }
    })
    .state('app.character', {
        url: '/character/:characterId',
        views: {
            'menuContent': {
                templateUrl: 'templates/character.html',
                controller: 'CharacterCtrl'
            }
        }
    })
    .state('app.donate', {
        url: '/donate',
        views: {
            'menuContent': {
                templateUrl: 'templates/donate.html',
                controller: 'DonateCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/characters');
});

angular.module('marvelous.services', []);

angular.module('marvelous.controllers', ['marvelous.services', 'ngCordova'])
.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    //setup IAP junk here
    document.addEventListener('deviceready', initializeStore, false);

    function initializeStore() {

        if (!store) {
            //Where the fuck is the store?
            return;
        }

        //Testing IAPs
        if (store.plugin && store.plugin.setTestMode) {
            store.plugin.setTestMode(true);
        }

        store.register({
            id: "donate_1",
            alias: "Buy me a beer",
            type: store.CONSUMABLE
        });

        store.register({
            id: "donate_2",
            alias: "Beer beer beer!",
            type: store.CONSUMABLE
        });

        store.when("donate_1").approved(function () {
            $rootScope.$broadcast('purchase', "donate_1");
        });

        store.when("donate_2").approved(function () {
            $rootScope.$broadcast('purchase', "donate_2");
        });

        store.refresh();
    };

    //global scope methods
    $scope.buildThumbnailPath = function (thumbnail) {
        if (!thumbnail) {
            return null;
        }
        return thumbnail.path + "." + thumbnail.extension;
    };

    $scope.extractIdFromUrl = function (url) {
        try{
            return url.substring(url.lastIndexOf('/') + 1);
        }
        catch(ex) {
            return null;
        }
    };

});