dogBook_app.directive("changeOnScreenResize", ["$window", function($window) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        $window.onresize = function() {
          changeImage();
          scope.$apply();
        }
        
        //$window.on('resize', function(){
        //  changeImage();
        //  scope.$apply();
        //});
        //debugger;
        changeImage();
        
        function changeImage() {
          var screenWidth = $window.innerWidth;
          
          if(screenWidth <= 400) {
            //attrs.src = attrs.small;
            //elem.attr('src', attrs.small);
            elem.attr('width', attrs.small);
            elem.attr('height', attrs.small);
          }

          else if(screenWidth <= 1024) {
            //attrs.src = attrs.small;
            //elem.attr('src', attrs.small);
            elem.attr('width', attrs.med);
            elem.attr('height', attrs.med);
          } else {
            //elem.attr('src', attrs.big);
            elem.attr('width', attrs.big);
            elem.attr('height', attrs.big);
          }
        }
      }
    };
  }])