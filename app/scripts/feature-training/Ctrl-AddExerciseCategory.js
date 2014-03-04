'use strict';

angular.module('TrainerApp')
  .controller('AddExerciseCategoryCtrl', function ($scope, ExerciseService, Models, Nav) {

      init();


      function init() {
          
          //$scope.muscleGroups = Models.MuscleGroups();
         // $scope.categories = Models.ExerciseCategory();

      }


      $scope.addExerciseCategory = function () {

          ExerciseService.addExerciseCategory($scope.category, function (cat) {
              Nav.superadmin();

          });
      }
  });
