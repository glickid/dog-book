var dogBook_app = angular.module('dogBookApp', ["ngRoute"]);

dogBook_app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'home.html',
      controller : 'homeCtrl'
    })
    .when('/dogsGallery', {
        templateUrl : 'App/dogBook/dogsGallery.html',
        controller : 'dogBookCtrl'
    })
    // .when('/dogs/:dogBreed', {
    //     templateUrl : 'App/Movies/moviesGallery.html',
    //     controller : 'moviesCtrl'
    // })
    .otherwise({redirectTo: '/'
    });
});