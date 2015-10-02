angular.module('marvelous.controllers')
.controller('CameraCtrl', function ($scope, $cordovaCamera) {

    $scope.takePhoto = function () {
        getPhoto();
    };

    function getPhoto() {
        document.addEventListener("deviceready", function () {

            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                var image = document.getElementById('cameraImg');
                image.src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // error
            });

        }, false);
    };

});
