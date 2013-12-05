'use strict';

angular.module('TrainerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'zhlqVKKbFuYRyxvFatNOtEUpoCzmQQ84';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
}
])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/addClient', {
        templateUrl: 'views/addClient.html',
        controller: 'AddclientCtrl'
      })
      .when('/superadmin', {
        templateUrl: 'views/superadmin.html',
        controller: 'SuperadminCtrl'
      })
      .when('/trainer', {
        templateUrl: 'views/trainer.html',
        controller: 'TrainerCtrl'
      })
      .when('/createRoutine', {
        templateUrl: 'views/createRoutine.html',
        controller: 'CreateroutineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }); 
  });
