'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, Signup, Models) {

      $scope.trainer = Models.Trainer();
      //create a function that your form submission will data bind to
      $scope.addTrainer = function () {
          Signup.saveTrainer($scope.trainer);

      }
  });
