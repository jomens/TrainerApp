'use strict';

angular.module('TrainerApp')
  .controller('AddTrainerCtrl', function ($scope, UserService, Models, Identity, Nav) {

      init();

      function init() {
          $scope.trainer = Models.Trainer();
          
      }

      $scope.addTrainer = function () {
          $scope.trainer.siteId = Identity.getLoggedInUser().siteId;
          $scope.trainer.institutionId = Identity.getLoggedInUser().institutionId;

          UserService.addUser($scope.trainer, function () {
              Nav.trainers();
          });
      }

      $scope.goToPortal = function () {
          Nav.portal();
      }
  });

