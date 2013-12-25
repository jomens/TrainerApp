'use strict';

angular.module('TrainerApp')
  .controller('MyTrainersCtrl', function ($scope, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "personal trainers";
          $rootScope.subTitle = "";

          TrainerService.getTrainers(function (trainers) {
              $scope.trainers = trainers;
              $scope.$apply();
          });
          
      }

     
  });
