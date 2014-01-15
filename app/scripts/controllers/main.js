'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Identity, $location, TrainerService, $route, RoutineService, Azure, Settings, $timeout) {
      init();
      
      function init() {

         // $rootScope.title = "GYM";
          // $rootScope.subTitle = "RABBIT";
          Settings.init();

       var  user =  Identity.getLoggedInUser();
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
          TrainerService.getNonRemoteClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
              
                  getUserRoutines($scope.clients);

          });

          TrainerService.getRemoteClients(function (remoteClients) {
              $scope.remoteClients = remoteClients;
              $scope.$apply();
              
              getUserRoutines($scope.remoteClients);
          });
      }

      function loadUserData() {
          console.log("xxx load user data()");

          var user = Identity.getLoggedInUser();
          $scope.clients = [user];
          getUserRoutines($scope.clients, function () {
              //get rid of green ring
              $scope.clients[0].training = false;
          });
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

      $scope.getCity = function (index) {
          var cities = ["San Diego", "Seattle", "Bellevue", "Ballard", "New York", "Atlanta", "Kent", "Redmond", "Las Vegas", "Redmond", "Bellevue", "Kent"];
          return cities[index];
      }

      $scope.reveal = function (client) {
          $scope.revealClient = client;
          $('#myModal').foundation('reveal', "open");
      }

      $scope.closeReveal = function (client) {
          $('#myModal').foundation('reveal', "close");
      }

      $scope.sendNote = function () {
          $('#myModal').foundation('reveal', "close");
      }
  });
