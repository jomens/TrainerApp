'use strict';

angular.module('TrainerApp')
  .controller('GoCtrl', function ($scope, TrainerService) {
   
      init();

      function init() {
         $scope.routine = TrainerService.getCurrentRoutine();
      }
  });
