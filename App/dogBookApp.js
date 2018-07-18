var dogBook_app = angular.module('dogBookApp', ["ngRoute"]);

dogBook_app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'home.html',
      controller : 'homeCtrl'
    })
    .when('/dogsGallery', {
        templateUrl : 'App/dogBook/dogBook.html',
        controller : 'dogBookCtrl'
    })
    .when('/dog/:dogBreed', {
        templateUrl : 'App/dogGallery/dogGallery.html',
        controller : 'dogGalleryCtrl'
    })
    .otherwise({redirectTo: '/'
    });
});