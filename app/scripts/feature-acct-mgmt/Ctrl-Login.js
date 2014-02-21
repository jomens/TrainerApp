'use strict';

angular.module('TrainerApp')
 .controller('LoginCtrl', function ($scope, Identity, Nav, $rootScope) {

      init();

      function init() {
          $scope.logon = { email: "", pin: "" }
      }
      $scope.login = function () {
          Identity.loginWithPin($scope.logon, function (user) {
              Nav.portal();
              $scope.$apply();
          });
      }
         
      //Facebook, Google, etc
      //$scope.login = function (authService) {
      //    //console.log("calling in login service");
      //    Identity.login(authService, function (u) {

      //        $location.path("/dashboard");
      //        $scope.$apply();
      //    }, function (e) {
      //        //console.log("user account does not exist");

      //        $location.path("/signup");
      //        $scope.$apply();
      //    })
      //}

      $scope.logout = function () {
          Identity.logout(function () {

                Nav.home();
            });
        
      }
  });
