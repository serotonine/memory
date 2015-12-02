app.controller('homeCtrl', ['$scope','$rootScope','memoryFactory', function($scope,$rootScope, memoryFactory){
	$scope.type="animals";
	$scope.level=8;
	//$rootScope.user
	memoryFactory.user.init();

	$scope.setType= function(e,t){
		$scope.type=t;
		// console.log(e.target);
		$(e.target).siblings().removeClass("active");
		$(e.target).addClass("active");
		}
	$scope.setLevel= function(e,nb){
		$scope.level=nb;
		$(e.target).siblings().removeClass("active");
		$(e.target).addClass("active");

		}
	memoryFactory.get()
	.then(
		function(data){ $scope.list = data; },
		function(msg){ console.log(msg); }
	);

}]);

app.controller('memoryCtrl', ['$scope','$rootScope','memoryFactory','utilsFactory','$routeParams','$timeout', '$route','$interval','$location',	 function ($scope,$rootScope, memoryFactory,utilsFactory, $routeParams,$timeout,$route,$interval,$location){

	$scope.level = $routeParams.level;
	$scope.carts=[];
	$scope.winCarts=0;
	$scope.success=false;
	$scope.timer=0;
	$scope.startGame=false;
	$scope.pseudo = "pseudo";
	var countTime;


	memoryFactory.get().then(
		function(data){
			var list = data[$routeParams.type];
			$scope.list = memoryFactory.prepareCart(list, $routeParams.level);
			},
		function(msg){ console.log(msg); }
	);
	//ADD SCORE
	$scope.addScore = function(pseudo){

		//ADD SCORE

			if($scope.winCarts== $scope.level/2){
				$scope.pseudo=pseudo;
				$scope.score.pseudo = $scope.pseudo;
				memoryFactory.user.addScore($scope.score);
				$location.path('/score');
			}

	}


	//CHECKCART
	$scope.checkCart = function(obj, e){
		//the first call to checkCart init the timer
		if($scope.startGame==false){
			countTime = $interval(function() { $scope.timer++; }, 1000);
			$scope.startGame =true;
		}
		if($scope.carts.length!=2){
			// e.target.setAttribute("class", "active");
			angular.element(e.target).addClass("active");
			$scope.carts.push(obj.name);

		}

		if($scope.carts.length==2) {
			if( $scope.carts[0] === $scope.carts[1] ){

				$timeout(function(){

					// $('img[alt='+$scope.carts[0]+']').removeClass('active');
						angular.element(e.target).remove();

					$('img[alt='+$scope.carts[0]+']:first').clone().prependTo($('#memory-found'));
					$('img[alt='+$scope.carts[0]+']').parent('li').empty().addClass('empty');
					$scope.winCarts++;
					$scope.carts=[];
					if($scope.winCarts== $scope.level/2){
						$interval.cancel(countTime);

					$scope.score = {
						// "pseudo":	$scope.pseudo,
						"date":memoryFactory.getDate(),
							"time":$scope.timer,
							"level":$scope.level,
							"type":$routeParams.type };

						//to do display with smooth
						$timeout(function(){ 	$scope.success=true; },500);

					}
				}, 1000);
				}
			else{

			$timeout(function(){
				($scope.carts).forEach(function(el){
					$('.back').removeClass('active');
				});
				$scope.carts=[];
			}, 700);
			}
		 }
	}//end check cart



$scope.reload= function(){ $route.reload(); }

$scope.onSuccess = function (el){ console.log(el);}

}]);//end memoryCtrl

/////// SCORE ///////

app.controller('scoreCtrl', ['$scope','$rootScope','memoryFactory', function($scope,$rootScope,memoryFactory){
$scope.scores = memoryFactory.user.getScores();


}]);
