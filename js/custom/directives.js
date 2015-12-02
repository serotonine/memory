app.directive('boxHome', function(){

  return {
    restrict:'A',//E=Element, A=Attribute, C=Class, M=Comment
    controller:'homeCtrl',
    templateUrl:'partials/home-tpl.html'
  }


});
