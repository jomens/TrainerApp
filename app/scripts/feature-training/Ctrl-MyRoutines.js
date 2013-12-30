'use strict';

angular.module('TrainerApp')
  .controller('MyroutinesCtrl', function ($scope, TrainerService) {

      init();

      function init() {

          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

      }
  });
