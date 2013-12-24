'use strict';

angular.module('TrainerApp')
  .controller('SelectroutineCtrl', function ($scope, $routeParams, $location, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "select a routine";
          $rootScope.subTitle = "";

          var trainerId = $routeParams.id;
          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

      }

      $scope.routineSelected = function (routine) {
          TrainerService.setCurrentRoutine(routine);
          $location.path("/go");

      }
  });
