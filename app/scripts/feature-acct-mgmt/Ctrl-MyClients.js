'use strict';

angular.module('TrainerApp')
  .controller('MyclientsCtrl', function ($scope, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "my clients";
          $rootScope.subTitle = "";

         // var trainerId = TrainerService.getCurrentTrainer().id;
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });
          
      }

     
  });
