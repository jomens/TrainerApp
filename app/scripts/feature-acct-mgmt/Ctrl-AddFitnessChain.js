'use strict';

angular.module('TrainerApp')
  .controller('AddfitnesschainCtrl', function ($scope, Signup, Models, $rootScope) {

      init();

      function init() {
          $rootScope.title = "add Fitness Chain";
          $rootScope.subTitle = "";
          $scope.chain = Models.FitnessChain();
          var admin = Models.User();
            admin.isAdmin = true;
            admin.userType = "fitnesschainadmin";

            $scope.admin = admin;
          //$scope.userTypes = Utils.parseObject(Models.UserType());
      }

      //create a function that your form submission will data bind to
      $scope.addChain = function () {
          Signup.addFitnessChain($scope.chain, $scope.admin);

      }
  });
