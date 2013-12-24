'use strict';

angular.module('TrainerApp')
  .controller('MyclientsCtrl', function ($scope, $routeParams, TrainerService, $rootScope) {

      init();

      function init() {
          $rootScope.title = "my clients";
          $rootScope.subTitle = "";

          var trainerId = $routeParams.id;
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });
          
      }

     
  });
