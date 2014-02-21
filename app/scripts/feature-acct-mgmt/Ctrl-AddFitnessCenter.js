'use strict';

angular.module('TrainerApp')
  .controller('AddFitnessCenterCtrl', function ($scope, SignupService, Models, Nav) {

      init();

      function init() {
          $scope.gym = Models.FitnessCenter();
          var admin = Models.FitnessCenterAdmin();

          $scope.admin = admin;
      }

      $scope.addFitnessCenter = function () {
          SignupService.addFitnessCenter($scope.gym, $scope.admin, function () {
              Nav.portal();
          });
         
      }
  });
