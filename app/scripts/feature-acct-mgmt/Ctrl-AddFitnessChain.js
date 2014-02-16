'use strict';

angular.module('TrainerApp')
  .controller('AddfitnesschainCtrl', function ($scope, SignupService, Models) {

      init();

      function init() {
          $scope.chain = Models.FitnessChain();
          var admin = Models.User();

            $scope.admin = admin;
          //$scope.userTypes = Utils.parseObject(Models.UserType());
      }

      //create a function that your form submission will data bind to
      $scope.addChain = function () {
          SignupService.addFitnessChain($scope.chain, $scope.admin);

      }
  });
