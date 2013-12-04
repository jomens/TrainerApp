'use strict';

angular.module('TrainerApp')
  .controller('AddclientCtrl', function ($scope, Signup, Models) {

      $scope.client = Models.Client();
      $scope.addClient = function () {
          Signup.saveClient($scope.client);

      }
  });

