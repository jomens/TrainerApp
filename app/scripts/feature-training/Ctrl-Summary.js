'use strict';

angular.module('TrainerApp')
  .controller('SummaryCtrl', function ($scope, TrainerService, $location) {

      init();

      function init() {

          $(document).foundation();

          TrainerService.endTrainingSession(function (data) {
              $scope.summary = data;
              $scope.$apply(); 
          });
      }

      $scope.confirmEndofSession = function () {
          $('#myModal').foundation('reveal', 'close');

          $(document).on('closed', '[data-reveal]', function () {
              var modal = $(this);

              TrainerService.resetTrainingInfo(function () {
                  $location.path("/");
                  //$scope.$apply();
              });
             
          });
      }
  });
