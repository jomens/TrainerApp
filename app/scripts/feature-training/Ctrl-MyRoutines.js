'use strict';

angular.module('TrainerApp')
  .controller('MyroutinesCtrl', function ($scope, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "my routines";
          $rootScope.subTitle = "";

          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

      }
  });
