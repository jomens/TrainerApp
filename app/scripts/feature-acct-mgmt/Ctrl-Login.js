'use strict';

angular.module('TrainerApp')
  .controller('LoginCtrl', function ($scope, Identity, $location) {

      init();

      function init() {
      }

      //$scope.login = function () {
      //    Identity.login($scope.login, function () {
      //        $location.path("/");
      //        $scope.$apply();
      //    });

      
      //}

      //Facebook, Google, etc
      $scope.login = function (authService) {
     
          Identity.login(authService, function (u) {
              Identity.userLoggedIn = true;
              //$location.path("/");
              //$scope.$apply();
              console.log(u);
          }, function (e) {
              console.log(e);
          })
      }

      $scope.logout = Identity.logout;
  });
