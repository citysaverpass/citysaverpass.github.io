angular.module('ControlCtrl', ['ngRoute', 'flybaseResourceHttp', 'loginMcFly'])
/* Controllers */
.controller('ControlListCtrl', function($scope, $rootScope, $timeout, $location, $route, login,me) {
	$scope.shownavbar = true;
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
})
.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/control', {
		templateUrl: 'app/control/list.html?v=1.a',
		controller: 'ControlListCtrl',
		resolve:{
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
	});
}]);