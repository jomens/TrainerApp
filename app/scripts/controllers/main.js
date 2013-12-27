'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Identity, $location, TrainerService, $route) {
      init();

      function init() {
          $rootScope.title = "TRAINER";
          $rootScope.subTitle = "METRO";
          

         var user =  Identity.getLoggedInUser();
         if (user) {
            TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });
         }
         else {
             $location.path("/login");
            
         }
      
      }
           
      $rootScope.logout = function () {
          Identity.logout();
          $location.path("/");
          $route.reload();
      }

      $scope.gotoUserPortal = function () {
         
          var user = $scope.loggedInUser;
          switch (user.userType) {
              case "trainer":
                  $location.path("/trainer");
                  break;
              case "fitnesschainadmin":
                  $location.path("/fitnessChainPortal");
                  break;
              case "fitnesscenteradmin":
                  $location.path("/fitnessCenterPortal");
                  break;
              case "user":
                  $location.path("/userPortal");
                  break;
          }
      };
  });
