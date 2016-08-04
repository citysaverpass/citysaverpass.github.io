'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'myApp.config',
	'myApp.models',
	"UserCtrl",
	'MainCtrl', 
	'ControlCtrl', 
	'CouponCtrl', 
	'VendorCtrl', 
	'myApp.directives'
]);

String.prototype.toHex = function() {
    var buffer = forge.util.createBuffer(this.toString());
    return buffer.toHex();
}

String.prototype.toSHA1 = function() {
    var md = forge.md.sha1.create();
    md.update(this);
    return md.digest().toHex();
}