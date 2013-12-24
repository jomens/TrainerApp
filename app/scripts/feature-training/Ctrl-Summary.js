'use strict';

angular.module('TrainerApp')
  .controller('SummaryCtrl', function ($scope, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "workout summary";
          $rootScope.subTitle = "";

          TrainerService.endTrainingSession(function (data) {
              $scope.summary = data;
              //console.log(data);
              $scope.$apply(); 
          });
      }
  });
