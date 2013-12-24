'use strict';

angular.module('TrainerApp')
  .controller('MyroutinesCtrl', function ($scope, $routeParams, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "my routines";
          $rootScope.subTitle = "";

          var trainerId = $routeParams.id;
          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

      }
  });
