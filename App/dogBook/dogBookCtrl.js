dogBook_app.controller('dogBookCtrl', function ($scope, $location, dogBookSrv) {

    $scope.dogsArr = dogBookSrv.getDogsArr();

    if ($scope.dogsArr.length === 0) {
        getBreedList();
    }

    $scope.aFilter = "";
    

    function getBreedList ()
    {
        dogBookSrv.getBreedList().then(function (success) {
            $scope.dogsArr = success;

            $scope.refreshGalleryPics();

        }, function (error) {
            cosole.log(error);
        });
    }

    $scope.refreshGalleryPics = function ()
    {
        dogBookSrv.getRandomImages().then(function (success) {
            $scope.dogsArr = success;
        }, function (error) {
            console.log(error);
        });
    }
    $scope.dogFilter = function (dog) {
        var lowerBreed = dog.breed.toLowerCase()
        
        if (lowerBreed.includes($scope.aFilter) ||
            dog.breed.includes($scope.aFilter) ) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.showGalleryOfDog = function(dog)
    {
        $location.path("/dog/" + dog.breed );
    }
});