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
      .when('/myClients/:id', {
        templateUrl: 'views/myClients.html',
        controller: 'MyclientsCtrl'
      })
      .when('/myRoutines/:id', {
        templateUrl: 'views/myRoutines.html',
        controller: 'MyroutinesCtrl'
      })
      .when('/selectClient', {
        templateUrl: 'views/selectClient.html',
        controller: 'SelectclientCtrl'
      })
      .when('/selectRoutine', {
        templateUrl: 'views/selectRoutine.html',
        controller: 'SelectroutineCtrl'
      })
      .when('/go', {
        templateUrl: 'views/go.html',
        controller: 'GoCtrl'
      })
      .when('/workout', {
        templateUrl: 'views/workout.html',
        controller: 'WorkoutCtrl'
      })
      .when('/summary', {
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl'
      })
      .when('/cardio', {
        templateUrl: 'views/cardio.html',
        controller: 'CardioCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }); 
  });
