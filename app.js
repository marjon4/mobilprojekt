var uniChat = angular.module('app', ['ngRoute']);

uniChat.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/homepage', {
      templateUrl: 'index.html',
      controller: 'homeCtrl'
    }).
    when('/chatview', {
      templateUrl: '/chatView.html',
      controller: 'pubnub'
    }).
    otherwise({
      redirectTo: '/homepage'
    });
  }
]);