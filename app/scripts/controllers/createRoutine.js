'use strict';

angular.module('TrainerApp')
  .controller('CreateroutineCtrl', function ($scope, RoutineService, ExerciseService, Models, $timeout) {

      var defaultBp = "Chest";

      init();

      $timeout(function () {
          angular.element(".create-routine").addClass("move-right");
      }, 1000)

      function init() {
          $scope.exTitle = defaultBp + " Exercises";
          $scope.bodyParts = ExerciseService.getBodyParts();
          $scope.exercises = ExerciseService.getExercisesByBodyPart(defaultBp);
      }

      $scope.selectBodypart = function (bp) {
          defaultBp = bp;
          init();
      }
     

      $scope.split = function (tags) {
          return tags.split(",").map(function (tag) {
              return Models.Tags()[$.trim(tag)];
          })
      }
  });
