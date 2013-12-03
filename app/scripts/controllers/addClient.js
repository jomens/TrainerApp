'use strict';

angular.module('TrainerApp')
  .controller('AddclientCtrl', function ($scope, Signup, Models) {

      $scope.user = Models.User();
      $scope.addClient = function () {
          Signup.saveClient($scope.user);

      }
  });

