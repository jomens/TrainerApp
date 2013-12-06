'use strict';

angular.module('TrainerApp')
  .controller('CreateroutineCtrl', function ($scope, RoutineService, ExerciseService, Models, $timeout) {

      $scope.selectedExercises = [];
      var exercises = {};

      init();
      //TODO: SAVE ROUTINE. REMOVE SELECTED PROPERTY, SET TRAINER ID. DONE.
      $timeout(function () {
          angular.element(".create-routine").addClass("move-right");
      }, 500);

      function init() {
         // $scope.exTitle = "nothing selected";
          $scope.bodyParts = ExerciseService.getBodyParts();
          
      } 

      function getExercises(bp) {
          if (exercises[bp]) {
              return exercises[bp];
          }
          else {
              exercises[bp] = ExerciseService.getExercisesByBodyPart(bp);
              return exercises[bp];
          }
          
      }

      $scope.selectBodypart = function (bp) {
          $scope.exTitle = bp + " Exercises";

          $scope.exercises = getExercises(bp);
          angular.element(".create-routine").removeClass("move-right");

      }
     
      $scope.addExercise = function (ex) {
          ex.selected = true;
          $scope.selectedExercises.push(ex);
      }

      $scope.split = function (tags) {
          return tags.split(",").map(function (tag) {
              return Models.Tags()[$.trim(tag)];
          })
      }
  });
