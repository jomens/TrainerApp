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
          templateUrl: 'scripts/feature-acct-mgmt/v-signup.html',
        controller: 'SignupCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/addClient', {
          templateUrl: 'scripts/feature-acct-mgmt/v-addClient.html',
          controller: 'AddclientCtrl'
      })
      .when('/addTrainer', {
          templateUrl: 'scripts/feature-acct-mgmt/v-addTrainer.html',
          controller: 'AddTrainerCtrl'
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
      .when('/myTrainers/:id', {
          templateUrl: 'scripts/feature-acct-mgmt/v-myTrainers.html',
          controller: 'MyTrainersCtrl'
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
          templateUrl: 'scripts/feature-acct-mgmt/v-login.html',
        controller: 'LoginCtrl'
      })
      .when('/pinreset', {
          templateUrl: 'scripts/feature-acct-mgmt/v-pinreset.html',
        controller: 'PinresetCtrl'
      })
      .when('/addFitnessChain', {
          templateUrl: 'scripts/feature-acct-mgmt/v-addFitnessChain.html',
        controller: 'AddfitnesschainCtrl'
      })
      .when('/addFitnessCenter', {
          templateUrl: 'scripts/feature-acct-mgmt/v-addFitnessCenter.html',
          controller: 'AddFitnessCenterCtrl'
      })
      .when('/userPortal', {
          templateUrl: 'scripts/feature-acct-mgmt/v-userPortal.html',
        controller: 'UserportalCtrl'
      })
      .when('/fitnessChainPortal', {
          templateUrl: 'scripts/feature-acct-mgmt/v-fitnessChainPortal.html',
        controller: 'FitnesschainportalCtrl'
      })
      .when('/fitnessCenterPortal', {
          templateUrl: 'scripts/feature-acct-mgmt/v-fitnessCenterPortal.html',
        controller: 'FitnesscenterportalCtrl'
      })
      .when('/userProfile', {
          templateUrl: 'scripts/feature-user-profiles/v-userProfile.html',
        controller: 'UserprofileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }); 
  });
