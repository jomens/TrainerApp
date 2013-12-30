'use strict';

angular.module('TrainerApp')
  .controller('MyclientsCtrl', function ($scope, TrainerService, $rootScope) {

      init();

      function init() {

          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });
          
      }

      $scope.clientSelected = function (client) {

          TrainerService.setCurrentClient(client);
          $location.path("/clientProfile");

      }
  });
