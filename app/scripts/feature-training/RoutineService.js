'use strict';

angular.module('TrainerApp')
  .factory('RoutineService', function (Azure, Identity, Notifier, $location, LocalStorage) {


    
      return {
          
          saveRoutine: function (routine, exercises) {
              var that = this;
              routine.createdBy = Identity.getLoggedInUser().id;

              routine.bodyParts = this.stringifyBodyParts(exercises);
              Notifier.busy(true);
              Azure.RoutineResource().save(routine, function (savedRoutine) {
                 // Notifier.done("Routine saved");
                  // $location.path("/trainer");
                  that.addExerciseToRoutine(savedRoutine, exercises);
              }, Notifier.errorHandler)
          },
          getRoutineExercises: function (routineId, callback) {
              var cachedRoutineDetails = LocalStorage.getRoutineDetails();
              if (cachedRoutineDetails && routineId == cachedRoutineDetails.routine.id) {
                  console.log("getting from cache");
                  callback(cachedRoutineDetails, "cached");
                  return;
              }
              console.log("no cache");


              var that = this;
              Notifier.busy();
              Azure.table("routine_exercises").read({
                  where: {
                      routineId: routineId},
                  success: function (listOfExercises) {
                      var exs = that.getExercisesFromLocalStorage(listOfExercises);
                      callback(exs);
                  }
              })
          },
          getExercisesFromLocalStorage: function (listOfExercises) {
            
              var routine = LocalStorage.getCurrentRoutine();
              var rt_bodyParts = routine.bodyParts.split(",");

             // var rt_exercideIds = routine.exerciseIds.split(",");
              var rt_exercideIds = listOfExercises.map(function (ex) {
                  return ex.exerciseId;
              });

              var found = {};
              var list = [];

              rt_bodyParts.forEach(function (bodypart) {
                  var exs = LocalStorage.getExercises($.trim(bodypart)) || [];

                  exs.forEach(function (ex) {
                      ex.completed = false; // to turn from red/green

                      if ($.inArray(ex.id, rt_exercideIds) != -1) {
                          if (!found[ex.id]) {
                              list.push(ex);
                              found[ex.id] = true;
                          }

                      }
                  });

              });

              var routineDetails = { routine: routine, associatedExercises: list }
              LocalStorage.setRoutineDetails(routineDetails);

              return routineDetails;
          },

          addExerciseToRoutine: function(savedRoutine, exercises){
              exercises.forEach(function (ex) {
                  var rtx = { routineId: savedRoutine.id, exerciseId: ex.id };
                  Azure.Routine_Exercise_Resource().save(rtx, function (data) {
                  }, Notifier.errorHandler)
              });
               Notifier.done("Routine saved");
               $location.path("/trainer");
          },
          stringifyBodyParts: function (listOfExercises) {
              var parts = [];

              listOfExercises.forEach(function (ex) {
                  var bp = $.trim(ex.bodyPart);
                  if ($.inArray(bp, parts) === -1) {
                      parts.push(bp);
                  }

              })

              return parts.join(", ");              
          },
          stringifyExerciseIds: function (listOfExercises) {
              var exIds = [];

              listOfExercises.forEach(function (ex) {                  
                  exIds.push(ex.id);
              })

              return exIds.join()
            
          }
        };
  });
