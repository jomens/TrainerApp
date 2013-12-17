'use strict';

angular.module('TrainerApp')
  .controller('GoCtrl', function ($scope, TrainerService, ExerciseService, $location) {
   
      init();

      function init() {
          var routine = TrainerService.getCurrentRoutine();
          $scope.routine = routine;
          TrainerService.startTrainingSession();
          $scope.exercises = ExerciseService.getExerciseFromRoutine(routine);
      }

      $scope.selectExercise = function (ex) {
          TrainerService.setCurrentWorkout(ex);
          $location.path("/workout");
      }
  });
