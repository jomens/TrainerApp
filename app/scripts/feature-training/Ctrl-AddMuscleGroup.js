'use strict';

angular.module('TrainerApp')
  .controller('AddMuscleGroupCtrl', function ($scope, ExerciseService, Models, Nav) {

      init();


      function init() {
          
          $scope.muscleGroups = Models.MuscleGroups();
          $scope.categories = Models.ExerciseCategory();

      }


      $scope.addMuscleGroup = function () {
          

          ExerciseService.addMuscleGroup($scope.muscleGroup, function (mg) {
              Nav.superadmin();

          });
      }
  });
