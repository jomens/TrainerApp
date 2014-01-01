'use strict';

angular.module('TrainerApp')
  .controller('RoutineDetailsCtrl', function ($scope, RoutineService, $routeParams) {

      init();

      function init() {

          RoutineService.getRoutineExercises($routeParams.id,  function (routineDetails, cached) {
              $scope.routineDetails = routineDetails;
              if (!cached) {
              $scope.$apply();

              }
          });

      }
  });
