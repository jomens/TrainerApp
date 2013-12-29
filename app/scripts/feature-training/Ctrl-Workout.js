'use strict';

angular.module('TrainerApp')
  .controller('WorkoutCtrl', function ($scope, TrainerService, $location, $rootScope) {

      init();

      function init() {

          $scope.workout = TrainerService.getCurrentWorkout();
        
          $rootScope.title = $scope.workout.exerciseName;
          $rootScope.subTitle = "";

          getLastWorkout();
     }

      function getLastWorkout() {
          TrainerService.getLastWorkout(function (result) {
              var lastWkt;
              if (result && result[0]) {
                  lastWkt = result[0];
                  getSets(lastWkt);

              }
          });
      }

      function getSets(wkt) {
          TrainerService.getWorkoutSets(wkt, function (results) {
              console.log(results);

              $scope.lastSets = results;
              $scope.$apply();
          });
      }

      $scope.addSet = function () {
          $scope.workout = TrainerService.addSetToWorkout($scope.set);
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
