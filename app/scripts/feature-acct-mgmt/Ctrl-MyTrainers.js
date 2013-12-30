'use strict';

angular.module('TrainerApp')
  .controller('MyTrainersCtrl', function ($scope, TrainerService) {

      init();

      function init() {

          TrainerService.getTrainers(function (trainers) {
              $scope.trainers = trainers;
              $scope.$apply();
          });
          
      }

     
  });
