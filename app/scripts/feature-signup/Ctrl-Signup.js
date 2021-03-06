'use strict';

angular.module('TrainerApp')
  .controller('SignupCtrl', function ($scope, UserService, Models, Utils, Identity, Azure) {
     

      init();

      function init() {
         
          setupTrainerSignup();
          setupInstitutionsignup();
      }

      function setupTrainerSignup() {
          var trainer = Models.Trainer();
          //if (Azure.Client().currentUser) {
           //   trainer.auth_userId = Azure.Client().currentUser.userId;
              $scope.trainer = trainer;
              //getAuth($scope.trainer);
         // }

      }


      function setupInstitutionsignup() {

      }


      //$scope.login = function (authService) {

      //    Identity.login(authService, function (u) {
              
      //        getAuth();
      //    }, function (e) {
      //        console.log(e);
      //    })
      //}

      function getAuth(user) {
          Identity.getAuthServiceData(function (data) {
              user.auth_userId = data.auth_userId;
              user.firstName = data.firstName;
              user.lastName = data.lastName;
              user.gender = data.gender;

              $scope.$apply();

          });

      }

      $scope.trainerSignUp = function () {

          UserService.addUser($scope.trainer, function (savedUser) {
              Identity.setLoggedInUser(savedUser);
          });

      }
  });
