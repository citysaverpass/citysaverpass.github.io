'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp.config', [])
.constant('version', '1.0.4')
.constant('loginRedirectPath', '/login')
.constant('SERVER_CONFIG', {	//	for talking to local API
	url: '/api'
}).constant('FLYBASE_CONFIG',{		API_KEY:'token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcGlrZXkiOiI1ZjA1MzQ0OS0wODJhLTQ4ZTUtOGIxYy01ZTk2NjBlYzFlYTgiLCJpYXQiOjE0NjgzNzUxOTUsImNyZWF0ZWQiOiIyMDE2LTA3LTEyIDE4OjU5OjU1IiwiZXhwaXJlcyI6IjIwMTYtMDgtMTEgMTg6NTk6NTUifQ.0-C9mkJ91iSyxS7BqSfda4KRYNMnd-br4g3Mmgd79_E', 
	DB_NAME:'citysaverpass'
})
// speed up angular by disabling debug...
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])
// double check that the app has been configured before running it and blowing up space and time...
.run(['FLYBASE_CONFIG', '$timeout', function(FLYBASE_CONFIG, $timeout) {
	if( FLYBASE_CONFIG.API_KEY.match('YOUR-API-KEY') ) {
		angular.element(document.body).html('<div class="container"><h1>Please configure <code>app/config.js</code> before running!</h1></div>');
		$timeout(function() {
			angular.element(document.body).removeClass('hide');
		}, 250);
	}
}]);
