'use strict';

angular.module('TrainerApp')
  .controller('RoutineDetailsCtrl', function ($scope, RoutineService, $routeParams, $location) {

      init();

      function init() {

          $scope.routine = $location.search();
          RoutineService.getRoutineExercisesByRoutineId($routeParams.id, function (exercises) {
              $scope.exercises = exercises;
              $scope.$apply();

          });

      }
  });
