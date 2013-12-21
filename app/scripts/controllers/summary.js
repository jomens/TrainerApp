'use strict';

angular.module('TrainerApp')
  .controller('SummaryCtrl', function ($scope, TrainerService) {
      init();

      function init() {
          TrainerService.endTrainingSession(function (data) {
              $scope.summary = data;
              //console.log(data);
              $scope.$apply();
          });
      }
  });
