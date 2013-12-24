'use strict';

angular.module('TrainerApp')
  .controller('SelectclientCtrl', function ($scope, $routeParams, TrainerService, $location, $rootScope) {

      init();

      function init() {
          $rootScope.title = "select a client";
          $rootScope.subTitle = "";
          var trainerId = $routeParams.id;
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });

      }

      $scope.clientSelected = function (client) {

          TrainerService.setCurrentClient(client);
          $location.path("/selectRoutine");

      }

  });
