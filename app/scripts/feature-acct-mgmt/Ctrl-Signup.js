'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, Signup, Models, Utils, Identity, Azure) {

      init();

      function init() {
          $scope.userTypes = Utils.parseObject(Models.UserType());

          if (Azure.Client().currentUser) {
              getAuth();
         }
      }

      $scope.login = function (authService) {

          Identity.login(authService, function (u) {
              
              getAuth();
          }, function (e) {
              console.log(e);
          })
      }

      function getAuth() {
          Identity.getAuthServiceData(function (data) {
              var user = Models.User();
              user.auth_userId = data.auth_userId;
              user.firstName = data.firstName;
              user.lastName = data.lastName;
              user.gender = data.gender;

              $scope.user = user;
              $scope.$apply();

          });

      }

      //create a function that your form submission will data bind to
      $scope.addUser = function () {

          Signup.addUser($scope.user, function (savedUser) {
              Identity.setLoggedInUser(savedUser);
          });

      }
  });
