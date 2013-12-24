'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, Signup, Models, Utils) {

      $scope.user = Models.User();
      $scope.userTypes = Utils.parseObject(Models.UserType());

      //create a function that your form submission will data bind to
      $scope.addUser = function () {

          Signup.addUser($scope.user);

      }
  });
