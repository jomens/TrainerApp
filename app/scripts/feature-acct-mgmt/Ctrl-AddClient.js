'use strict';

angular.module('TrainerApp')
  .controller('AddclientCtrl', function ($scope, Signup, Models, LocalStorage, $rootScope) {

      init();

      function init() {
          $rootScope.title = "add a client";
          $rootScope.subTitle = "";
          $scope.client = Models.User();
          
      }

      $scope.addClient = function () {
              $scope.client.trainerId = LocalStorage.getTrainer().id;
              $scope.client.userType = "user";

              Signup.addUser($scope.client);

          }
  });

