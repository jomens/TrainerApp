'use strict';

angular.module('TrainerApp')
  .factory('RoutineService', function (Azure, Identity, Notifier, $location, LocalStorage, Models) {


    
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
          getRoutineExercises: function (routineId, callback) { //this pulls from local storage
              var cachedRoutineDetails = LocalStorage.getRoutineDetails();
              if (cachedRoutineDetails && routineId == cachedRoutineDetails.routine.id) {
                  console.log("getting from cache");
                  callback(cachedRoutineDetails, "cached");
                  return;
              }
              console.log("no cache");


              var that = this;
              Notifier.busy(true);
              Azure.table("routine_exercises").read({
                  where: {
                      routineId: routineId},
                  success: function (listOfExercises) {
                      var exs = that.getExercisesFromLocalStorage(listOfExercises);
                      callback(exs);
                  }
              })
          },
          getRoutineExercisesByRoutineId: function(routineId, callback){ //get from service
              var that = this;
              Notifier.busy(true);
              

              Azure.table("routine_exercises").read({
                  where: {
                      routineId: routineId
                  },
                  success: function (routineIds_exerciseIds) {
                      that.getExercisesByExerciseIds(routineIds_exerciseIds, function (result) {
                          callback(result);

                      });
                  }
              })
          },
          getExercisesByExerciseIds: function (routineIds_exerciseIds, callback) {

              var num = routineIds_exerciseIds.length;
              var start = 0;
              var exercises = [];

              routineIds_exerciseIds.forEach(function (routine_exercise) {
              

                  Azure.table("exercises").read({
                      where: {
                          id: routine_exercise.exerciseId
                      },
                      success: function (ex) {
                          start++;


                          exercises.push(ex[0]);

                          if (start == num) {

                              callback(exercises);
                              Notifier.done();
                          }

                      }
                  })

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
          createRoutineAssignments: function (options) {
              Notifier.busy(true);

              var numUsers = options.users.length;
              var counter = 0;
              options.users.forEach(function (user) {
                  var assignment = Models.RoutineAssignment();
                  assignment.routineId = options.routine.id;
                  assignment.assignedTo = user.id;
                  assignment.assignedBy = Identity.getLoggedInUser().id;
                  assignment.date = moment(options.date).format("L");
                  //completed is false by default;

                  Azure.Routine_Assignments_Resource().save(assignment, function (rtna) {
                      counter++;

                      if (counter == numUsers) {
                          Notifier.done("success", true);
                          options.callback(rtna);
                      }

                  }, Notifier.errorHandler)


              })

             
          },
          getRoutineAssignments: function (users, callback) { //whereOptions so callers can tell this routine they want . easier fo reuse?
              var that = this;

              var numUsers = users.length;
              var counter = 0;
              var foundRoutine = 0;
              var routineCount = 0;
              users.forEach(function (user) {
                  Azure.table("routine_assignments").read({
                      where: {
                          assignedTo: user.id,
                          date: moment().format("L")
                      },
                      success: function (rta) {
                        
                          counter++;

                          if (rta && rta[0]) {
                              foundRoutine++;
                              user.rta = rta[0];
                              that.getRoutineById(user.rta.routineId, function (rtn) {
                                  user.routine = rtn;

                                 // callback(user);
                              })
                          }

                          if (counter == numUsers) {
                              Notifier.done("", true);

                              //if (!foundRoutine) {
                                 // callback();
                                  //return;
                              //}
                              //that.getRoutineById(user.rou)
                          }
                          
                      },
                      error: function (err) {
                          console.log(err);
                      }
                  })
              })
          },
          getRoutineById: function(id, callback){
              Azure.RoutineResource().get({ id: id }, function (rtn) {
                  callback(rtn);

              }, Notifier.errorHandler)
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
