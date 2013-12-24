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
        templateUrl: 'scripts/feature-training/v-trainer.html',
        controller: 'TrainerCtrl'
      })
      .when('/createRoutine', {
          templateUrl: 'scripts/feature-training/v-createRoutine.html',
        controller: 'CreateroutineCtrl'
      })
      .when('/myClients/:id', {
          templateUrl: 'scripts/feature-acct-mgmt/v-myClients.html',
        controller: 'MyclientsCtrl'
      })
      .when('/myRoutines/:id', {
          templateUrl: 'scripts/feature-training/v-myRoutines.html',
        controller: 'MyroutinesCtrl'
      })
      .when('/selectClient', {
          templateUrl: 'scripts/feature-training/v-selectClient.html',
        controller: 'SelectclientCtrl'
      })
      .when('/selectRoutine', {
          templateUrl: 'scripts/feature-training/v-selectRoutine.html',
        controller: 'SelectroutineCtrl'
      })
      .when('/go', {
          templateUrl: 'scripts/feature-training/v-go.html',
        controller: 'GoCtrl'
      })
      .when('/workout', {
          templateUrl: 'scripts/feature-training/v-workout.html',
        controller: 'WorkoutCtrl'
      })
      .when('/summary', {
          templateUrl: 'scripts/feature-training/v-summary.html',
        controller: 'SummaryCtrl'
      })
      .when('/cardio', {
          templateUrl: 'scripts/feature-training/v-cardio.html',
        controller: 'CardioCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/pinreset', {
        templateUrl: 'views/pinreset.html',
        controller: 'PinresetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }); 
  });
