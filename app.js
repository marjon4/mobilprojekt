var uniChat = angular.module('app', ['ngRoute','ngResource', 'ngSanitize']);

uniChat.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'welcome.html',
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