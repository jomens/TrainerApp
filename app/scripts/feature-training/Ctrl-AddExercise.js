'use strict';

angular.module('TrainerApp')
  .controller('AddExerciseCtrl', function ($scope, ExerciseService, Models, Nav) {

      init();


      function init() {
          ExerciseService.getMuscleGroups(function (mgs) {
              $scope.muscleGroups = mgs;

          });
          ExerciseService.getExerciseCategories(function (excats) {
              $scope.categories = excats;

          });
          
          //$scope.muscleGroups = Models.MuscleGroups();
         // $scope.categories = Models.ExerciseCategory();

      }


      $scope.addExercise = function () {
          console.log("submitting...");
         // $scope.exercise.bodyPart = $scope.selectedMuscleGroups.join(", ");
         // $scope.exercise.tags = $scope.selectedCategories.join();

          var options = {};
          options.exerciseName = $scope.exercise.name;
          options.muscleGroups = $scope.selectedMuscleGroups;
          options.exerciseCategories = $scope.selectedCategories

          ExerciseService.addExercise(options, function (ex) {
              //console.log(ex);
              Nav.portal();
          });
      }
  });
