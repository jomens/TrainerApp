'use strict';

angular.module('TrainerApp')
  .controller('CreateroutineCtrl', function ($scope, RoutineService, ExerciseService, Models, $timeout) {

      $scope.selectedExercises = [];
      var exercises = {};

      init();
      $timeout(function () {
          angular.element(".create-routine").addClass("move-right");
      }, 500);

      function init() {
          //$scope.bodyParts = ExerciseService.getBodyParts();

          ExerciseService.getMuscleGroups(function (mgs) {
              $scope.bodyParts = mgs;

          });

      }

      //function getExercises(bp) {
      //    if (exercises[bp]) {
      //        return exercises[bp];
      //    }
      //    else {
      //        exercises[bp] = ExerciseService.getExercisesByBodyPart(bp);
      //        return exercises[bp];
      //    }

      //}

      $scope.selectBodypart = function (mg) {
          $scope.exTitle = mg.name;// + " Exercises";

         // $scope.exercises = getExercises(bp);
          ExerciseService.getExercisesByMuscleGroup(mg.id, function (exs) {
              $scope.exercises = exs;
              $scope.$apply();
              console.log(exs);
          angular.element(".create-routine").removeClass("move-right");

          });

      }

      $scope.addExercise = function (ex) {
          ex.selected = true;
          $scope.selectedExercises.push(ex);
      }
           
      $scope.saveRoutine = function () {
          if (!$scope.routineName) {
              toastr.error("Routine name required");
              return;
          }

          var routine = Models.Routine();
          routine.name = $scope.routineName;
          routine.description = $scope.description;
          routine.expectedSets = 3;
          //routine.exercises = $scope.selectedExercises;

          RoutineService.saveRoutine(routine, $scope.selectedExercises);
      }
  });
