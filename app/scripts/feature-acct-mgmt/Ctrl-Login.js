'use strict';

angular.module('TrainerApp')
 .controller('LoginCtrl', function ($scope, Identity, $location, $rootScope, $route) {

      init();

      function init() {
      }
     //$scope.login = function (authService) {

     //    Identity.login(authService, function (u) {

     //        getAuth();
     //    }, function (e) {
     //        console.log(e);
     //    })
     //}

     //function getAuth() {
     //    Identity.getAuthServiceData(function (data) {
     //        var user = Models.User();
     //        user.auth_userId = data.auth_userId;
     //        user.firstName = data.firstName;
     //        user.lastName = data.lastName;
     //        user.gender = data.gender;

     //        $scope.user = user;
     //        $scope.$apply();

     //    });

     //}
      
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
                //$route.reload();
            });
        
      }
  });
