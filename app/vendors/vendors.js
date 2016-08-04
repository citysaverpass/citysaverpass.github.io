angular.module('VendorCtrl', ['ngRoute', 'flybaseResourceHttp', 'loginMcFly'])
/* Controllers */
.controller('VendorListCtrl', function($scope, $rootScope, $timeout, $location, $route, vendors,login,me,Vendor) {
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

	$scope.vendors = vendors;
	var vendorsCopy = angular.copy( $scope.vendors );
	var Ref = Vendor.flybase();

	Ref.on('added', function( data ){
		$timeout(function() {
			$scope.vendors.push( data.value() );
		});
	});
	Ref.on('changed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.vendors ){
				var vendor = $scope.vendors[ i ];
				if( vendor._id == snapshot._id ){
					$scope.vendors[ i ] = snapshot;
				}
			}
		});
	});
	Ref.on('removed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.vendors ){
				var vendor = $scope.vendors[ i ];
				if( vendor._id == snapshot._id ){
					$scope.vendors.splice(i, 1);
				}
			}
		});
	});
})
.controller('VendorViewCtrl', function($scope, $location, vendor,Login) {
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	$scope.vendor = vendor;
})
.controller('VendorFormCtrl', function($scope, $location, $window, vendor,Login) {
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	var vendorCopy = angular.copy(vendor);

	$scope.vendor = vendor;

	$scope.save = function(){
		$scope.vendor.$saveOrUpdate().then(function(returnData){
			$location.path('/vendors');
		}, function(error) {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.remove = function() {
		$scope.vendor.$remove(function() {
			$location.path('/vendors');
		}, function() {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.hasChanges = function(){
		return !angular.equals($scope.vendor, vendorCopy);
	};
})
.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/vendors', {
		templateUrl: 'app/vendors/list.html?a=1',
		controller: 'VendorListCtrl',
		resolve:{
			vendors:function(Vendor){
				return Vendor.all();
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
	}).when('/vendors/edit/:id', {
		templateUrl: 'app/vendors/form.html?a=2.a',
		controller: 'VendorFormCtrl',
		resolve:{
			vendor:function(Vendor, $route){
				var p = Vendor.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/vendors/view/:id', {
		templateUrl: 'app/vendors/view.html?a=1',
		controller: 'VendorViewCtrl',
		resolve:{
			vendor:function(Vendor, $route){
				var p = Vendor.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/vendors/new', {
		templateUrl: 'app/vendors/form.html?a=2.a',
		controller:'VendorFormCtrl', 
		resolve:{
			vendor:function(Vendor){
				return new Vendor();
			}
		}
	});	
}]);