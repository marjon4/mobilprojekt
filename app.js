var uniChat = angular.module('app', ['ngRoute','ngResource']);

uniChat.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'welcome.html',
      controller: 'homeCtrl'
    }).
    when('/chatView', {
      templateUrl: '/chatView.html',
      controller: 'ChatController'
    }).
    otherwise({
      redirectTo: '/'
    });
  
}]);