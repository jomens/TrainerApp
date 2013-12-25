'use strict';

angular.module('TrainerApp')
  .controller('SummaryCtrl', function ($scope, TrainerService, $rootScope, $location) {

      init();

      function init() {
          $rootScope.title = "workout summary";
          $rootScope.subTitle = "";

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

              TrainerService.resetTrainingInfo();
              $location.path("/");
              $scope.$apply();
          });
      }
  });
