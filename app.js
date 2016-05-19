var uniChat = angular.module('app', ['ngRoute','ngResource', 'ngSanitize']);

uniChat.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'home.html',
      controller: 'homeCtrl'
    }).
    when('/chatView', {
      templateUrl: '/chatView.html',
      controller: 'chatCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  
}]);