'use strict';

angular.module('TrainerApp')
  .controller('MyclientsCtrl', function ($scope, TrainerService, $rootScope, $location) {

      init();

      function init() {
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });
          
      }

      $scope.clientSelected = function (client) {
          var locationParams = $location.search();

          if (locationParams && locationParams.dest) {
              $location.path("/" + locationParams.dest + "/" + client[locationParams.param]).search({});
          } else {
              //TrainerService.setCurrentClient(client);
              $location.path("/userProfile/" + client.id);

          }

      }
  });
