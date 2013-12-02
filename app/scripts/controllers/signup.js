'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, Signup, Models) {
      //take a dependency on the signup service

      $scope.trainer = Models.Trainer();
      //create a function that your form submission will data bind to
      $scope.addTrainer = function () {
          Signup.saveTrainer($scope.trainer);

      }
      

      //setup an ng-model on your form // to correspond with a trainer model on your scope

      //your form inputs just will have model.blah...and that'll happen for free

      //finally, create a new trainer object...hint Models factory...

      //set the pro
  });
