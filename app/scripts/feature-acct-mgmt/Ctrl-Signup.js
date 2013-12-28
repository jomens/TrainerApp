'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, Signup, Models, Utils, $rootScope, Identity) {

      init();

      function init() {
          $rootScope.title = "signup";
          $rootScope.subTitle = "";
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
