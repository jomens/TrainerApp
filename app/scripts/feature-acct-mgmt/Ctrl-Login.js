'use strict';

angular.module('TrainerApp')
  .controller('LoginCtrl', function ($scope, Identity, $location) {

      init();

      function init() {
      }

      
      //Facebook, Google, etc
      $scope.login = function (authService) {
     
          Identity.login(authService, function (u) {
              $location.path("/dashboard");
              $scope.$apply();
          }, function (e) {
              console.log("error block called?");

              $location.path("/signup");
              $scope.$apply();
              console.log(e);
          })
      }

      $scope.logout = Identity.logout;
  });
