'use strict';

angular.module('TrainerApp')
  .controller('UserprofileCtrl', function ($scope, $routeParams, AccountService) {
      init();

      function init() {

          var userId = $routeParams.id;

          AccountService.getUserById(userId, function (user) { 
              $scope.user = user;
          });
      }
  });
