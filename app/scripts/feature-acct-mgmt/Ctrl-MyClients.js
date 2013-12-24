'use strict';

angular.module('TrainerApp')
  .controller('MyclientsCtrl', function ($scope, $routeParams, TrainerService) {
    
      init();

      function init() {
          var trainerId = $routeParams.id;
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });
          
      }

     
  });
