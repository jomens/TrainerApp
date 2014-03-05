'use strict';

angular.module('TrainerApp')
  .controller('MyroutinesCtrl', function ($scope, TrainerService, $location) {

      init();

      function init() {

          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

      }

      $scope.routineSelected = function (routine) {
          TrainerService.setCurrentRoutine(routine);
          $location.path("/routineDetails/" + routine.id).search(routine);

      }
  });
