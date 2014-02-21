'use strict';

angular.module('TrainerApp')
  .controller('SignupFitnessOrgCtrl', function ($scope, Models, Nav, SignupService) {
     

      init();

      function init() {
          setupFitnessOrgsignup();
      }

      function setupFitnessOrgsignup() {
          var org = Models.FitnessOrg();
          $scope.org = org;

          var admin = Models.FitnessOrgAdmin();
          $scope.admins = [admin];

          //if (Azure.Client().currentUser) {
           //   org.auth_userId = Azure.Client().currentUser.userId;
          //    $scope.org = org;
          //    getAuth($scope.trainer);
         // }

      }

      $scope.addAnotherAdmin = function () {
          $scope.admins.push(Models.FitnessOrgAdmin());
      }

      //$scope.trainerSignUp = function () {

      //    UserService.addUser($scope.trainer, function (savedUser) {
      //        Identity.setLoggedInUser(savedUser);
      //    });

      //}

      $scope.saveOrg = function () {
          SignupService.addFitnessOrg($scope.org, $scope.admins, function () {
              Nav.login();
              $scope.$apply();
          });
          //Nav.home();
      }
  });
