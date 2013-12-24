'use strict';

angular.module('TrainerApp')
  .controller('MyroutinesCtrl', function ($scope, $routeParams, TrainerService) {

      init();

      function init() {
          var trainerId = $routeParams.id;
          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

      }
  });
