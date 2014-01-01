'use strict';

angular.module('TrainerApp')
  .controller('GoCtrl', function ($scope, TrainerService, RoutineService, ExerciseService, $location, $routeParams) {

      init();

      function init() {

          var routine = TrainerService.getCurrentRoutine();
          $scope.routine = routine;


          TrainerService.startTrainingSession();

          var routineId = $routeParams.id || routine.id;

          RoutineService.getRoutineExercises(routineId, function (routineDetails, cached) {
              $scope.routineDetails = routineDetails;

              if (!cached) {
              $scope.$apply();

              }
          });
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
