'use strict';

angular.module('TrainerApp')
  .controller('SuperadminCtrl', function ($scope, DataImport, Azure, ExerciseService, LocalStorage, Notifier) {
    
      function error(err) {
          console.log("error");
      }

      $scope.loadExercises = function () {

          console.log("imports length" + DataImport.Exercises.length);
          //Azure.invokeApi({
          //    api: "loadexercises",
          //    method: "post",
          //    body: DataImport.Exercises,
          //    success: function (results) {
          //        console.log(results);
          //    }
          //});

          Notifier.busy();

          DataImport.Exercises.forEach(function (group) {

              //save the muscle group
              Azure.MuscleGroupResource().save({ name: group.muscleGroup }, function (mgp) {

                  group.exercises.forEach(function (ex) {
                      Notifier.busy();
                      //save each exercice
                      Azure.ExerciseResource().save({ name: ex }, function (savedEx) {

                          //link each exercise to the musclegroup
                          Azure.MuscleGroup_Exercises_Resource().save({ exerciseId: savedEx.id, muscleGroupId: mgp.id },
                             function () {
                                 //callback?
                                 Notifier.done();
                             }, error);

                      });

                  });
              });

          }, error);

      }

      $scope.loadRoles = function () {
          Notifier.busy();

          DataImport.Roles.forEach(function (role) {

              //save the muscle group
              Azure.RoleResource().save(role, function (savedRole) {
                      Notifier.done();                  
              });

          }, error);
      }

      $scope.fetchAll = function () {
          ExerciseService.fetchAllExercises(function () { });
      }

      $scope.clearData = function () {
          LocalStorage.setSettings(null);
      }
  });
