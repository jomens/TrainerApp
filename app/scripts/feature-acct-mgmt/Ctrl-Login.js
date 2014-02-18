'use strict';

angular.module('TrainerApp')
 .controller('LoginCtrl', function ($scope, Identity, $location, $rootScope, $route) {

      init();

      function init() {
      }
         
      //Facebook, Google, etc
      $scope.login = function (authService) {
          console.log("calling in login service");
          Identity.login(authService, function (u) {

              $location.path("/dashboard");
              $scope.$apply();
          }, function (e) {
              console.log("user account does not exist");

              $location.path("/signup");
              $scope.$apply();
          })
      }

      $scope.logout = function () {
          console.log("logging out");
          Identity.logout(function () {
              console.log("logout callback");

                $location.path("/");
                $route.reload();
            });
        
      }
  });
