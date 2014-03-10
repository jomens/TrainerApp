'use strict';

angular.module('TrainerApp')
  .controller('SignupInstitutionCtrl', function ($scope, Models, Nav, SignupService) {
     

      init();

      function init() {
          setupInstitutionsignup();
      }

      function setupInstitutionsignup() {
          var org = Models.Institution();
          $scope.org = org;

          var admin = Models.InstitutionAdmin();
          $scope.admins = [admin];

          //if (Azure.Client().currentUser) {
           //   org.auth_userId = Azure.Client().currentUser.userId;
          //    $scope.org = org;
          //    getAuth($scope.trainer);
         // }

      }

      $scope.addAnotherAdmin = function () {
          $scope.admins.push(Models.InstitutionAdmin());
      }

      //$scope.trainerSignUp = function () {

      //    UserService.addUser($scope.trainer, function (savedUser) {
      //        Identity.setLoggedInUser(savedUser);
      //    });

      //}

      $scope.saveOrg = function () {
          SignupService.addInstitution($scope.org, $scope.admins, function () {
              Nav.login();
              //$scope.$apply();
          });
          //Nav.home();
      }
  });
