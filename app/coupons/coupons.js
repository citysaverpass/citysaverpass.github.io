angular.module('CouponCtrl', ['ngRoute', 'flybaseResourceHttp', 'loginMcFly'])
/* Controllers */
.controller('CouponListCtrl', function($scope, $rootScope, $timeout, $location, $route, coupons,login,me,Coupon) {
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	$scope.me = me;
	if( typeof $scope.me.isAdmin === "undefined" ){
		console.log("not an admin, bye");
		$location.path('/login');
	}else if( $scope.me.isAdmin !== 1 ){
		console.log("not an admin, bye");
		$location.path('/login');
	}

	$scope.coupons = coupons;
	var couponsCopy = angular.copy( $scope.coupons );
	
	var Ref = Coupon.flybase();
	Ref.on('added', function( data ){
		$timeout(function() {
			$scope.coupons.push( data.value() );
		});
	});
	Ref.on('changed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.coupons ){
				var coupon = $scope.coupons[ i ];
				if( coupon._id == snapshot._id ){
					$scope.coupons[ i ] = snapshot;
				}
			}
		});
	});
	Ref.on('removed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.coupons ){
				var coupon = $scope.coupons[ i ];
				if( coupon._id == snapshot._id ){
					$scope.coupons.splice(i, 1);
				}
			}
		});
	});
})
.controller('CouponViewCtrl', function($scope, $location, Coupon,Login) {
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	$scope.Coupon = Coupon;
})
.controller('CouponFormCtrl', function($scope, $location, $window, Coupon,Login) {
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	var CouponCopy = angular.copy(Coupon);

	$scope.Coupon = Coupon;

	$scope.save = function(){
		$scope.Coupon.$saveOrUpdate().then(function(returnData){
			$location.path('/coupons');
		}, function(error) {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.remove = function() {
		$scope.Coupon.$remove(function() {
			$location.path('/coupons');
		}, function() {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.hasChanges = function(){
		return !angular.equals($scope.Coupon, CouponCopy);
	};
})
.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/coupons', {
		templateUrl: 'app/coupons/list.html?a=1',
		controller: 'CouponListCtrl',
		resolve:{
			coupons:function(Coupon){
				return Coupon.all();
			},
			login:function( Login ){
				return new Login();
			},
			me:function(User, Login){
				var login = new Login();
				if( login.isLoggedIn() ){
					var token = login._getToken();
					var u = User.getById(token);
//					alert( token );
					return u;
				}
			} 			
		}
	}).when('/coupons/edit/:id', {
		templateUrl: 'app/coupons/form.html?a=1',
		controller: 'CouponFormCtrl',
		resolve:{
			coupon:function(Coupon, $route){
				var p = Coupon.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/coupons/view/:id', {
		templateUrl: 'app/coupons/view.html?a=1',
		controller: 'CouponViewCtrl',
		resolve:{
			coupon:function(Coupon, $route){
				var p = Coupon.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/coupons/new', {
		templateUrl: 'app/coupons/form.html?a=1',
		controller:'CouponFormCtrl', 
		resolve:{
			coupon:function(Coupon){
				return new Coupon();
			}
		}
	});	
}]);