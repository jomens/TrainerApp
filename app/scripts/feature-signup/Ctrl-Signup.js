'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, UserService, Models, Utils, Identity, Azure) {
     

      init();

      function init() {
          $scope.trainer = Models.Trainer();
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

      $scope.trainerSignUp = function () {

          UserService.addUser($scope.trainer, function (savedUser) {
              Identity.setLoggedInUser(savedUser);
          });

      }
  });
