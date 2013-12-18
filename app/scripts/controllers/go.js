'use strict';

angular.module('TrainerApp')
  .controller('GoCtrl', function ($scope, TrainerService, ExerciseService, $location) {
   //routines do not match selected
      init();

      function init() {
          var routine = TrainerService.getCurrentRoutine();
          $scope.routine = routine;
          TrainerService.startTrainingSession();
          $scope.exercises = ExerciseService.getExerciseFromRoutine(routine).list;

      }

      $scope.selectExercise = function (ex) {
          TrainerService.setCurrentWorkout(ex);
          $location.path("/workout");
      }
  });
