dogBook_app.controller('dogBookCtrl', function ($scope, dogBookSrv) {

    $scope.dogsArr = dogBookSrv.getDogsArr();

    if ($scope.dogsArr.length === 0) {
        dogBookSrv.getBreedList().then(function (success) {
            $scope.dogsArr = success;

            dogBookSrv.getRandomImages().then(function (success) {
                $scope.dogsArr = success;
            }, function (error) {
                console.log(error);
            });

        }, function (error) {
            cosole.log(error);
        });
    }

});