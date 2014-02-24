'use strict';



angular.module('TrainerApp')
  .controller('DashboardCtrl', function ($scope, Identity, $location, TrainerService, RoutineService, Settings, Models, $rootScope, Nav) {
      init();
      
      function init() {

          Settings.init();

       var  user =  Identity.getLoggedInUser();
       if (user) {
           if (Models.UserType().isTrainer(user.userType)) {
                 loadTrainerData();
             }

           if (Models.UserType().isUser(user.userType)) {
               loadUserData();
           }

           //org admin
           if (Models.UserType().isOrgAdmin(user.userType)) {
               Nav.portal();
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

              if (clients && clients.length > 0) {
                  getUserRoutines($scope.clients);

              }
              else {
                  $scope.showNoClients = true;
              }
              

          });

          TrainerService.getRemoteClients(function (remoteClients) {
              $scope.remoteClients = remoteClients;
              $scope.$apply();
              
              if (remoteClients && remoteClients.length > 0) {
                  getUserRoutines($scope.remoteClients);

              }
              else {
                  $scope.showNoRemoteClients = true;
              }
          });
      }

      function loadUserData() {

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
           
    
      $scope.clientSelected = function (client) {

          TrainerService.setCurrentClient(client);
      
          if (client.routine) {
              TrainerService.setCurrentRoutine(client.routine);
              $location.path("/go/" + client.routine.id);
          } else {
              $location.path("/selectRoutine");
          }

      }
   
      $rootScope.gotoUserPortal = function () {
         
          var user = $scope.loggedInUser;

          switch (user.userType) {
              case "trainer":
                  $location.path("/trainer");
                  break;
              case "fitnessorgadmin":
                  $location.path("/fitnessOrgPortal");
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
