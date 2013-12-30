'use strict';

angular.module('TrainerApp')
  .controller('AddclientCtrl', function ($scope, Signup, Models, Identity) {

      init();

      function init() {
          $scope.client = Models.User();
          
      }

      $scope.addClient = function () {
          $scope.client.trainerId = Identity.getLoggedInUser().id;
              $scope.client.userType = "user";

              Signup.addUser($scope.client);

          }
  });

