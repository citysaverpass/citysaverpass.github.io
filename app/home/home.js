angular.module('MainCtrl', ['ngRoute'])
.controller('MainController', function($scope,$timeout,$location, Login, me) {
	$scope.tagline = 'To the moon and back!';	
	$scope.me = me;
	$scope.goToUrl = function( url ){
		self.location.href = url;
	}
	$scope.goToPage = function( page ){
		$location.path(page);
	}
}).controller('CouponCtrl', function($scope, $location, coupon) {
	$scope.coupon = coupon;
}).controller('VendorCtrl', function($scope, $location, vendor) {
	$scope.vendor = vendor;
}).config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'app/home/home.html?v=3.a',
		controller: 'MainController',
		resolve:{
			login:function( Login ){
				return new Login();
			},
			me:function(User, Login){
				var login = new Login();
				if( login.isLoggedIn() ){
					var token = login._getToken();
					var u = User.getById(token);
					return u;
				}
			} 			
		}
	}).when('/coupon/:id', {
		templateUrl: 'app/home/coupon.html?a=1',
		controller: 'CouponCtrl',
		resolve:{
			coupon:function(Coupon, $route){
				var c = Coupon.getById($route.current.params.id);
				return c;
			} 
		}
	}).when('/vendor/:id', {
		templateUrl: 'app/home/vendor.html?a=1',
		controller: 'VendorCtrl',
		resolve:{
			vendor:function(Vendor, $route){
				var v = Vendor.getById($route.current.params.id);
				return v;
			} 
		}
	});	
//	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/'});
}]);