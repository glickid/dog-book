dogBook_app.factory('dogBookSrv', function ($http, $log, $q, $timeout) {

    function Dog(breed, randomPic, picList) {
        this.breed = breed;
        //this.subBreed = subBreed;
        this.picList = picList;
        this.randomPic = randomPic;
    }
    var dogArr = [];

    function getDogsArr()
    {
        return dogArr;
    }

    function getBreedList() {
        var listBreedUrl = "https://dog.ceo/api/breeds/list/all"
        var async = $q.defer();

        if (dogArr.length === 0) {
            $http.get(listBreedUrl).then(function (success) {

                angular.forEach(success.data.message, function (key, value) {
                    if (key.length) {
                        for (var i = 0; i < key.length; i++) {

                            //there are no images for coton-detulear on server skip it!
                            if (value + "-" + key[i] === "coton-detulear")
                                continue;
                            var dog = new Dog(value + "-" + key[i], "", []);
                            dogArr.push(dog);
                        }
                    }
                    else {
                        var dog = new Dog(value, "", []);
                        dogArr.push(dog);
                    }
                });
                async.resolve(dogArr);
            }, function (error) {
                $log.log(error);
                async.reject("failed to get image for " + breed);
            });
        }

        return async.promise;
    }

    function getImagesRandomForBreed(breed, index) {
        var randomBreedUrl = "https://dog.ceo/api/breed/" + breed + "/images/random"
        var async = $q.defer();

        $http.get(randomBreedUrl).then(function (success) {

            dogArr[index].randomPic = success.data.message;
            async.resolve(dogArr);

        }, function (error) {


            $log.log(error);
            dogArr[index].randomPic = "/assests/placeholder.jpg"
            async.reject("failed to get image for " + breed);

        });

        return async.promise;
    }

    function getRandomImages() {
        var premises = [];
        var async = $q.defer();

        for (var i = 0; i < dogArr.length; i++) {
            premises.push($timeout(getImagesRandomForBreed(dogArr[i].breed, i),
                (100 + (30 * i))));
        }

        $q.all(premises).then(function (response) {
            async.resolve(dogArr);
        }, function (error) {
            $log.log(error);
            async.reject("failed to get random images")
        });

        //return(premises[premises.length-1].promise);
        return (async.promise);
    }

    function getBreedGallery(breed)
    {
        var async = $q.defer();
        var index = 0;
        var breedUrl = "https://dog.ceo/api/breed/" + breed + "/images";

        for(var index =0;index<dogArr.length; index++)
        {
            if(breed === dogArr[index].breed)
            {
                //async.promise = getDogGallery(dogArr[index]);
                break;
            }
        }
        
        $http.get(breedUrl).then(function (success, index) {
        
            if (index < dogArr.length)
            {
                dogArr[index].picList = success.data.message;
                async.resolve(dog.picList);
            }
            else
            {
                async.resolve(success.data.message);
            }

        }, function (error) {

            $log.log(error);
            async.reject("failed to get image for " + breed);

        });

        return async.promise;
    }

    return {
        getBreedList: getBreedList,
        getRandomImages: getRandomImages,
        getDogsArr : getDogsArr,
        getBreedGallery : getBreedGallery,
        getImagesRandomForBreed : getImagesRandomForBreed
        //getDogGallery : getDogGallery
    };
});