'use strict';

angular.module('TrainerApp')
  .controller('GoCtrl', function ($scope, TrainerService, ExerciseService, $location, $rootScope) {

      init();

      function init() {

          var routine = TrainerService.getCurrentRoutine();
          $scope.routine = routine;

          $rootScope.title = "Routine: " + routine.name;
          $rootScope.subTitle = "";

          TrainerService.startTrainingSession();
          $scope.exercises = ExerciseService.getExerciseFromRoutine(routine).list;

      }

      $scope.selectExercise = function (ex) {
          TrainerService.setCurrentWorkout(ex);

          if (ex.tags.indexOf("cardio") != -1) {
              $location.path("/cardio");
          } else {
              $location.path("/workout");
          }
      }
  });
