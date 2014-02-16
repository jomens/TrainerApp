'use strict';

angular.module('TrainerApp')
  .controller('UserprofileCtrl', function ($scope, $routeParams, UserService) {
      init();

      function init() {

          var userId = $routeParams.id;

          UserService.getUserById(userId, function (user) { 
              $scope.user = user;
          });
      }
  });
