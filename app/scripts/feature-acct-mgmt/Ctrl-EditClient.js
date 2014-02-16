'use strict';

angular.module('TrainerApp')
  .controller('EditClientCtrl', function ($scope, UserService, $routeParams, $location) {

      init();

      function init() {
          //$scope.client = Models.User();
          UserService.getUserById($routeParams.id, function (user) {
              $scope.client = user;
          })
          
      }

      $scope.update = function () {

          UserService.updateUser($scope.client, function (user) {
              $location.path("/userProfile/" + user.id);
          })

          }
  });

