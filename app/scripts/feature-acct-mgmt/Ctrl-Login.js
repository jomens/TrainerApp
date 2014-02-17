'use strict';

angular.module('TrainerApp')
 .controller('LoginCtrl', function ($scope, Identity, $location) {

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
          console.log("login succeeded");

              $location.path("/dashboard");
              $scope.$apply();
          }, function (e) {
              console.log("error block called? take user to signup");

              $location.path("/signup");
              $scope.$apply();
              console.log(e);
          })
      }

      $scope.logout = Identity.logout;
  });
