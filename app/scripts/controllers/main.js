'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Identity, $location, TrainerService, $route, RoutineService, Azure) {
      init();
      var user;
      function init() {
         // $rootScope.title = "GYM";
         // $rootScope.subTitle = "RABBIT";
          

         user =  Identity.getLoggedInUser();
         if (user) {
             if (user.isTrainer) {
                 loadTrainerData();
             }
             if (user.isUser) {
                 loadUserData();
             }
         }
         else {
             $location.path("/login");

         }
      
      }

      function loadTrainerData() {
          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();

              getUserRoutines($scope.clients);
          });
      }

      function loadUserData() {
          $scope.clients = [user];
          getUserRoutines($scope.clients);
      }


      function getUserRoutines(clients) {
          RoutineService.getRoutineAssignments(clients, function (data) {
              //if (data) {
                  $scope.$apply();
              //}
              //console.log("from scope");
              //console.log(clients);
          })
      }
           
      $rootScope.logout = function () {
          Identity.logout();
          $location.path("/");
          $route.reload();
      }

      $scope.clientSelected = function (client) {

          TrainerService.setCurrentClient(client);
      
          if (client.routine) {
              TrainerService.setCurrentRoutine(client.routine);
              $location.path("/go/" + client.routine.id);
          } else {
              $location.path("/selectRoutine");
          }

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
