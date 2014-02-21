'use strict';

angular.module('TrainerApp')
  .controller('MyTrainersCtrl', function ($scope, TrainerService, Nav) {

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

     
  });
