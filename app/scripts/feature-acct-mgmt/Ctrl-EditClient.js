'use strict';

angular.module('TrainerApp')
  .controller('EditClientCtrl', function ($scope, AccountService, $routeParams, $location) {

      init();

      function init() {
          //$scope.client = Models.User();
          AccountService.getUserById($routeParams.id, function (user) {
              $scope.client = user;
          })
          
      }

      $scope.update = function () {

          AccountService.updateUser($scope.client, function (user) {
              $location.path("/userProfile/" + user.id);
          })

          }
  });

