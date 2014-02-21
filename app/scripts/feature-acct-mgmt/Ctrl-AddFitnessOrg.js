'use strict';

angular.module('TrainerApp')
  .controller('AddfitnessorgCtrl', function ($scope, SignupService, Models) {

      init();

      function init() {
          $scope.org = Models.FitnessOrg();
          var admin = Models.User();

            $scope.admin = admin;
          //$scope.userTypes = Utils.parseObject(Models.UserType());
      }

      //create a function that your form submission will data bind to
      $scope.addOrg = function () {
          SignupService.addFitnessOrg($scope.org, $scope.admin);
         
      }
  });
