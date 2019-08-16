dogBook_app.factory('dogBookSrv', function ($http, $log, $q, $timeout) {

    function Dog(breed, id, randomPic, picList) {
        this.breed = breed;
        //this.subBreed = subBreed;
        this.id = id;
        this.picList = picList;
        this.randomPic = randomPic;
    }
    var dogArr = [];
    var arrIndex = -1;

    function getDogsArr()
    {
        return dogArr;
    }

    function getBreedList() {
        // var listBreedUrl = "https://dog.ceo/api/breeds/list/all"
        var listBreedUrl = "https://api.thedogapi.com/v1/breeds?x-api-key=452cf44b-f472-4a37-a4fb-a1e3e2bcdebd";
        var async = $q.defer();

        if (dogArr.length === 0) {
            $http.get(listBreedUrl).then(function (success) {

                angular.forEach(success.data, function (key) {
                    // if (key.length) {
                    //     for (var i = 0; i < key.length; i++) {

                    //         //there are no images for coton-detulear on server skip it!
                    //         if (value + "-" + key[i] === "coton-detulear")
                    //             continue;
                    //         var dog = new Dog(value + "-" + key[i], "", []);
                    //         dogArr.push(dog);
                    //     }
                    // }
                    // else {
                        var dog = new Dog(key.name, key.id, "", []);
                        dogArr.push(dog);
                    // }
                });
                async.resolve(dogArr);
            }, function (error) {
                $log.log(error);
                async.reject("failed to get image for " + breed);
            });
        }

        return async.promise;
    }

    function getImagesRandomForBreed(breed_id, index) {
        var randomBreedUrl = "https://api.thedogapi.com/v1/images/search?breed_id=" + breed_id + "&size=thumb&limit=1&format=json&x-api-key=452cf44b-f472-4a37-a4fb-a1e3e2bcdebd"
        // "https://dog.ceo/api/breed/" + breed + "/images/random"
        var async = $q.defer();

        $http.get(randomBreedUrl).then(function (success) {

            if (success.data.length > 0) {
                dogArr[index].randomPic = success.data["0"]["url"]; //message;
            } else {
                dogArr[index].randomPic = "/assets/placeholder.jpg";
            }
            async.resolve(dogArr);
        }, function (error) {


            $log.log(error);
            dogArr[index].randomPic = "/assets/placeholder.jpg";
            async.reject("failed to get image for " + breed);

        });

        return async.promise;
    }

    function getRandomImages() {
        var premises = [];
        var async = $q.defer();

        for (var i = 0; i < dogArr.length; i++) {
            premises.push($timeout(getImagesRandomForBreed(dogArr[i].id, i),
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
        var breed_id = -1;
        // "https://dog.ceo/api/breed/" + breed + "/images";

        for(;index<dogArr.length; index++)
        {
            if(breed === dogArr[index].breed)
            {
                //async.promise = getDogGallery(dogArr[index]);
                breed_id = dogArr[index].id;
                arrIndex = index;
                break;
            }
        }
        
        if ((breed_id == -1) || (index > dogArr.length-1)) 
            return null;

        var breedUrl = "https://api.thedogapi.com/v1/images/search?breed_id=" + breed_id + "&size=thumb&limit=100&format=json&x-api-key=452cf44b-f472-4a37-a4fb-a1e3e2bcdebd"

        $http.get(breedUrl).then(function (success) {
        
            for(var j=0; j<success.data.length; j++) {
                dogArr[arrIndex].picList.push(success.data[j].url);
            }
            
            arrIndex = -1;
            async.resolve(dogArr[index].picList);
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