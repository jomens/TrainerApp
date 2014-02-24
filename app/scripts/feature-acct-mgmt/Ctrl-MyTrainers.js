'use strict';

angular.module('TrainerApp')
  .controller('MyTrainersCtrl', function ($scope, TrainerService, Nav, $location) {

      init();

      function init() {
          
          TrainerService.getTrainers(function (trainers) {
              $scope.trainers = trainers;
              $scope.$apply();
          });
          
      }

      $scope.goToPortal = function () {
          Nav.portal();
      }

      $scope.trainerSelected = function (trainer) {
          var locationParams = $location.search();

          if (locationParams && locationParams.dest) {
              $location.path("/" + locationParams.dest + "/" + trainer[locationParams.param]).search({});
          } else {
              //TrainerService.setCurrentClient(client);
              $location.path("/userProfile/" + trainer.id);

          }

      }
  });
