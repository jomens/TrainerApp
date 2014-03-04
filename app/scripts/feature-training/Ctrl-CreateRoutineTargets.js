'use strict';

angular.module('TrainerApp')
  .controller('CreateRoutineTargetsCtrl', function ($scope, RoutineService, $location, Models) {

      var rtnAssignment = $location.search()

     

      init();

      function init() {
         
          getExercises(); 
      }

      function getExercises() {
          RoutineService.getRoutineExercisesByRoutineId(rtnAssignment.routineId, function (exs) {
              //console.log(exs);
              setupTargets(exs);
          })

      }

      function setupTargets(exs) {
          var targets = [];
          exs.forEach(function (ex) {
              var target = Models.WorkoutTarget();
              target.exerciseId = ex.id;

              for (var i = 0; i < target.expectedSets; i++) {
                  target.targetWeights.push(Models.TargetWeight());                  
              }

              // targets.push(target);
              ex.target = target;
          })
          console.log(exs);
          $scope.exs = exs;
          $scope.$apply();
         // $scope.targets = targets;
          //console.log(targets);
      }

      $scope.saveRoutine = function () {
         

          //RoutineService.saveRoutine(routine, $scope.selectedExercises);
      }
  });
