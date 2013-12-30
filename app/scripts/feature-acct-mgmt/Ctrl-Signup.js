'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, Signup, Models, Utils, Identity) {

      init();

      function init() {
          $scope.user = Models.User();
          $scope.userTypes = Utils.parseObject(Models.UserType());
      }

      //create a function that your form submission will data bind to
      $scope.addUser = function () {

          Signup.addUser($scope.user, function (savedUser) {
              Identity.setLoggedInUser(savedUser);
          });

      }
  });
