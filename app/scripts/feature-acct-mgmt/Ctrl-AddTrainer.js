'use strict';

angular.module('TrainerApp')
  .controller('AddTrainerCtrl', function ($scope, Signup, Models, Identity, $rootScope) {

      init();

      function init() {
          $rootScope.title = "add a trainer";
          $rootScope.subTitle = "";
          $scope.trainer = Models.User();
          
      }

      $scope.addTrainer = function () {
          $scope.trainer.fitnessCenterId = Identity.getLoggedInUser().fitnessCenterId
          $scope.trainer.userType = "trainer";

          Signup.addUser($scope.trainer);
          }
  });

