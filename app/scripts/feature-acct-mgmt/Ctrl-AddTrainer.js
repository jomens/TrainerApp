'use strict';

angular.module('TrainerApp')
  .controller('AddTrainerCtrl', function ($scope, UserService, Models, Identity, Nav) {

      init();

      function init() {
          $scope.trainer = Models.Trainer();
          
      }

      $scope.addTrainer = function () {
          $scope.trainer.fitnessCenterId = Identity.getLoggedInUser().fitnessCenterId;
          $scope.trainer.fitnessOrgId = Identity.getLoggedInUser().fitnessOrgId;

          UserService.addUser($scope.trainer, function () {
              Nav.trainers();
          });
      }

      $scope.goToPortal = function () {
          Nav.portal();
      }
  });

