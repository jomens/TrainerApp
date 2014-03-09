'use strict';

angular.module('TrainerApp')
  .controller('AddinstitutionCtrl', function ($scope, SignupService, Models) {

      init();

      function init() {
          $scope.org = Models.Institution();
          var admin = Models.User();

            $scope.admin = admin;
          //$scope.userTypes = Utils.parseObject(Models.UserType());
      }

      //create a function that your form submission will data bind to
      $scope.addOrg = function () {
          SignupService.addInstitution($scope.org, $scope.admin);
         
      }
  });
