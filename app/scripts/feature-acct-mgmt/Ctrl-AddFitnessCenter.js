'use strict';

angular.module('TrainerApp')
  .controller('AddFitnessCenterCtrl', function ($scope, Signup, Models, $rootScope) {

      init();

      function init() {
          $rootScope.title = "add Fitness Center";
          $rootScope.subTitle = "";

          $scope.gym = Models.FitnessCenter();
          var admin = Models.User();

          $scope.admin = admin;
      }

      $scope.addFitnessCenter = function () {
          Signup.addFitnessCenter($scope.gym, $scope.admin);
         // console.log($scope.gym)
          //console.log($scope.admin)
      }
  });
