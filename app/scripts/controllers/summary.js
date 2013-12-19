'use strict';

angular.module('TrainerApp')
  .controller('SummaryCtrl', function ($scope, TrainerService) {
      init();

      function init() {
          TrainerService.endTrainingSession(function (data) {
              $scope.summaryItems = data;
              $scope.$apply();
          });
      }
  });
