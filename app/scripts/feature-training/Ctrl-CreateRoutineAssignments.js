'use strict';

angular.module('TrainerApp')
  .controller('CreateRoutineAssignmentsCtrl', function ($scope, TrainerService, RoutineService, Nav) {

   

      init();

      function init() {
      
          $scope.step1 = true;
          $scope.selectedClients = [];

          TrainerService.getClients(function (clients) {
              $scope.clients = clients;
              $scope.$apply();
          });

          TrainerService.getRoutines(function (routines) {
              $scope.routines = routines;
              $scope.$apply();
          });

          $("#datepicker").datepicker({
              inline: true,
              onSelect: function (date, picker) {
                  $scope.date = date;
                  $scope.$apply();
              }
          })
      }

      function reset(){
          $scope.step1 = true;
          $scope.step2 = false;
          $scope.step3 = false;
          $scope.date = null;
          $scope.selectedClients = [];
      }

      $scope.clickme = function () {
          if (loc.dest) {
              $location.path("/" + loc.dest);
          }
      }

      $scope.clientSelected = function (client) {
          if (client.selected) {
              return;
          }

          client.selected = true;
          $scope.selectedClients.push(client);
         // TrainerService.setCurrentClient(client);
         // $location.path("/selectRoutine");

      }

      $scope.removeClient = function (client) {

          var index = $scope.selectedClients.indexOf(client)
          $scope.selectedClients.splice(index, 1);

          client.selected = false;

          //$scope.selectedClients.push(client);
          // TrainerService.setCurrentClient(client);
          // $location.path("/selectRoutine");

      }


      $scope.routineSelected = function (routine) {
          $scope.routine = routine;
          //TrainerService.setCurrentRoutine(routine);
          //$location.path("/routineDetails/" + routine.id);

      }

      $scope.showStep2 = function () {
          $scope.step1 = false;
          $scope.step2 = true;
      }

      $scope.showStep3 = function () {
          $scope.step2 = false;
          $scope.step3 = true;
      }

      $scope.submit = function () {
          RoutineService.createRoutineAssignments({
              users: $scope.selectedClients,
              routine: $scope.routine,
              date: $scope.date,
              callback: function (savedAssignment) {
                  //Nav.setRoutineTargets(savedAssignment.id).search(savedAssignment);
                  reset(); 
              }
          })
      }
  });
