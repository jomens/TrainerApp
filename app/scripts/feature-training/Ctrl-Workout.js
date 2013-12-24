'use strict';

angular.module('TrainerApp')
  .controller('WorkoutCtrl', function ($scope, TrainerService, $location) {
      //add workout notes
      init();

      function init() {
          $scope.workout = TrainerService.getCurrentWorkout();
      }

      $scope.addSet = function () {
          $scope.workout = TrainerService.addSetToWorkout($scope.set);

          //console.log($scope.workout);
          $scope.set = { weight: "", reps: "" };    
      }

      $scope.endWorkout = function () {
          if (!$scope.workout || $scope.workout.sets.length == 0) {
              $location.path("/go");
              return;
          }

          TrainerService.saveWorkout($scope.workout);
      }
      
  });
