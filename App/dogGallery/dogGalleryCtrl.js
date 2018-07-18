dogBook_app.controller('dogGalleryCtrl', function ($log, $scope,
    $routeParams, dogBookSrv) {


    $scope.theBreed = $routeParams.dogBreed;

    dogBookSrv.getBreedGallery($routeParams.dogBreed).then (
        function (success) {
            $scope.dogGallery = success;
        }, function(error) {
            console.log(error);
        }
    )
})
