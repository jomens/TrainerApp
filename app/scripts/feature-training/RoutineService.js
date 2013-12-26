'use strict';

angular.module('TrainerApp')
  .factory('RoutineService', function (Azure, Identity, Notifier, $location) {


    
      return {
          saveRoutine: function (routine) {
              routine.trainerId = Identity.getLoggedInUser().id;

              routine.bodyParts = this.stringifyBodyParts(routine.exercises);
              routine.exerciseIds = this.stringifyExerciseIds(routine.exercises);
              delete routine.exercises;
              Notifier.busy(true);
              Azure.RoutineResource().save(routine, function (data) {
                  Notifier.done("Routine saved");
                  $location.path("/trainer");
              }, Notifier.errorHandler)
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
