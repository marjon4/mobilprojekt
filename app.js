var uniChat = angular.module('app', ['ngRoute','ngResource']);

uniChat.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/homepage', {
      templateUrl: 'index.html',
      controller: 'homeCtrl'
    }).
    when('/chatView', {
      templateUrl: '/chatView.html',
      controller: 'ChatController'
    }).
    otherwise({
      redirectTo: '/homepage'
    });
  
}]);