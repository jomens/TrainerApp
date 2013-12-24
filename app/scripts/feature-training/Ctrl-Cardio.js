'use strict';

angular.module('TrainerApp')
  .controller('CardioCtrl', function ($scope, Utils, Models, TrainerService, $location) {
    
      init();

      function init() {
          $scope.cardio = Models.CardioWorkout();
          var workout = TrainerService.getCurrentWorkout();

          $scope.cardio.trainingSessionId = workout.trainingSessionId;
          $scope.cardio.exerciseId = workout.exerciseId;
          $scope.cardio.exerciseName = workout.exerciseName;
          $scope.cardio.trainingSessionId = workout.trainingSessionId;

          $scope.modes = Utils.parseObject(Models.CardioModes());
      }

      $scope.addCardio = function () {
          
          TrainerService.saveWorkout($scope.cardio);
      }

     

  });
