dogBook_app.controller("homeCtrl", function ($scope, $location) {

    $scope.gotoGallery = function ()
    {
        $location.path('/dogsGallery')
    }

    $scope.gotoBreedGallery = function (breed)
    {
        $location.path('/dogs/breed')
    }
});