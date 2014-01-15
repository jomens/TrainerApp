'use strict';

angular.module('TrainerApp')
  .controller('WorkoutCtrl', function ($scope, TrainerService, $location, $rootScope) {

      init();

      function init() {

          $scope.workout = TrainerService.getCurrentWorkout();
        
          //$rootScope.title = $scope.workout.exerciseName;
          //$rootScope.subTitle = "";
          //checkDisabled();
          getLastWorkout();
     }

    
      function getLastWorkout() {
          TrainerService.getLastWorkout(function (result) {
              var lastWkt;
              if (result && result[0]) {
                  lastWkt = result[0];

                  $scope.lastWorkout = lastWkt;
                  $scope.lastWorkoutDate = moment(lastWkt.__createdAt).fromNow();
                  $scope.$apply();

                  getSets(lastWkt);

              }
          });
      }

      function getSets(wkt) {
          TrainerService.getWorkoutSets(wkt, function (results) {
              
              $scope.lastSets = results;
              $scope.$apply();
             
          });
      }

      $scope.addSet = function () {
          //if (!$scope.set.weight && !$scope.set.reps) {
          //    return;
          //}
          
          $scope.workout = TrainerService.addSetToWorkout($scope.set); 
          $scope.set = { weight: "", reps: "" };    
      }

      $scope.endWorkout = function () {
          if (!$scope.workout || $scope.workout.sets.length == 0) {
              $location.path("/go/");
              return;
          }

          TrainerService.saveWorkout($scope.workout);
      }

      $scope.addNotes = function () {
          $scope.showNotes = true;
      }
      $scope.hideNotes = function () {
          $scope.showNotes = false;
      }
      
  });
