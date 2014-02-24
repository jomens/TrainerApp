'use strict';

angular.module('TrainerApp')
  .controller('DeleteClientCtrl', function ($scope, TrainerService, UserService) {

      init();

      function init() {
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });

      }

      $scope.delete = function (client) {
          UserService.deleteUser(client, function () {
              init();
          })

      }
  });
