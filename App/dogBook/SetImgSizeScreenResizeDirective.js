dogBook_app.directive("setImgSizeScreenResize", ["$window", function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $window.onresize = function () {
                changeImage();
                scope.$apply();
            }

            //no such method 'on' for $window
            //$window.on('resize', function(){
            //});

            //changeImage();

            function changeImage() {
                var screenWidth = $window.innerWidth;

                if (screenWidth <= 512) {
                    elem.attr('width', attrs.small);
                    elem.attr('hieght', attrs.small);
                } if (screenWidth <= 1024) {
                    elem.attr('width', attrs.med);
                    elem.attr('hieght', attrs.med);
                } else {
                    elem.attr('width', attrs.small);
                    elem.attr('hieght', attrs.small);
                }
            }
        }
    };
}])