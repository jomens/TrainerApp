'use strict';

angular.module('TrainerApp')
  .controller('AddclientCtrl', function ($scope, UserService, Models, Identity, Nav) {

      init();

      function init() {
          $scope.client = Models.User();
          
      }

      $scope.addClient = function () {
         
          UserService.addUser($scope.client, function () {
              Nav.clients();
          });

          }
  });

