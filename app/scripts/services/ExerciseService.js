'use strict';

angular.module('TrainerApp')
  .factory('ExerciseService', function (Models, Azure, LocalStorage, Notifier) {

      return {
          fetchAllExercises: function (callback) {
              
              var bodyParts = this.getBodyParts();
              var numBodyParts = bodyParts.length;
              var dataLoadCount = 0;
              console.log("Fetching exercises");

              bodyParts.forEach(function(bp){
                  Azure.table("exercises").read({
                      where: {
                          fn: function (bp) {
                              return this.bodyPart.indexOf(bp) != -1;
                          },
                          param: bp
                      },
                      success: function (exercises) {
                          LocalStorage.setExercises(bp, exercises)
                          dataLoadCount++;

                          if (dataLoadCount === numBodyParts) {
                              LocalStorage.setSettings({
                                  dataLoaded: true,
                                  dataLoadedDate: new Date()
                              })

                          }
                      }
                  })
            
              });
              
          },
          getBodyParts: function () {
              var bodyParts = Models.BodyParts();
              var parts = [];

              for (var key in bodyParts) {
                  parts.push(bodyParts[key]);
              }

            return parts;
          },
          getTags: function () {
              var tags = Models.Tags();
              var list = [];

              for (var key in tags) {
                  list.push(tags[key]);
              }

              return list;
          },
          getExercisesByBodyPart: function (bp) {
              return LocalStorage.getExercises(bp);
          },
          //getExerciseFromRoutine: function (routine) {
          //    var cachedRoutines = LocalStorage.getRoutineDetails();
          //    if (cachedRoutines) {
          //        console.log("getting from cache");
          //        return cachedRoutines;
          //    }
          //    console.log("no cache");
          //    var rt_bodyParts = routine.bodyParts.split(",");
          //    var rt_exercideIds = routine.exerciseIds.split(",");

          //    var found = {};
          //    var list = []; 

          //    rt_bodyParts.forEach(function (bodypart) {
          //        var exs = LocalStorage.getExercises($.trim(bodypart)) || [];

          //        exs.forEach(function (ex) {
          //            ex.completed = false; // to turn from red/green

          //            if ($.inArray(ex.id, rt_exercideIds) != -1) {
          //                if(!found[ex.id]){
          //                   list.push(ex);
          //                found[ex.id] = true;
          //              }
                      
          //            }
          //        });

          //    });

          //    LocalStorage.setRoutineDetails({ routineId: routine.id, list: list });

          //    return { routineId: routine.id, list: list };
          //},
          addExercise: function (options, callback, error) {
              Notifier.busy();

              Azure.ExerciseResource().save({ name: options.exerciseName }, function (savedEx) {

                  Notifier.done();
                  //options.muscleGroups = $scope.selectedMuscleGroups;
                  //options.exerciseCategories = $scope.selectedCategories

                  if (options.muscleGroups.length > 0) {

                      options.muscleGroups.forEach(function(mgId){
                          Azure.MuscleGroup_Exercises_Resource().save({ exerciseId: savedEx.id, muscleGroupId: mgId },
                              function () {
                                  //callback?
                              }, Notifier.error);
                          
                          });
                  }

                  if (options.exerciseCategories.length > 0) {

                      options.exerciseCategories.forEach(function (catId) {
                          Azure.Exercises_ExerciseCategory_Resource().save({ exerciseId: savedEx.id, exerciseCategoryId: catId },
                              function () {
                                  //callback?
                              }, Notifier.error);

                      });
                  }

                  if (callback) {
                      callback(savedEx);
                  }
              }, Notifier.error)
          },
          addExerciseCategory: function (cat, callback) {
              Notifier.busy();

              Azure.ExerciseCategoryResource().save(cat, function (data) {

                  Notifier.done();

                  if (callback) {
                      callback(data);
                  }
              }, Notifier.error)
          },
          addMuscleGroup: function (mg, callback) {
              Notifier.busy();

              Azure.MuscleGroupResource().save(mg, function (data) {

                  Notifier.done();

                  if (callback) {
                      callback(data);
                  }
              }, Notifier.error)
          },
          getMuscleGroups: function (callback) {
              Notifier.busy();
              Azure.MuscleGroupResource().query({}, function (mgs) {
                  Notifier.done();
                  callback(mgs);
              }, Notifier.error)

          },
          getExerciseCategories: function (callback) {
              Notifier.busy();
              Azure.ExerciseCategoryResource().query({}, function (mgs) {
                  Notifier.done();
                  callback(mgs);
              }, Notifier.error)

          },
          getExercisesByMuscleGroup: function (mgId, callback) {
              Notifier.busy();

              var exercises = [];
              var num;
              var start = 0;
              Azure.MuscleGroup_Exercises_Resource().query({ muscleGroupId: mgId }, function (mgIds_ExIds) {

                  if (mgIds_ExIds.length > 0) {
                      num = mgIds_ExIds.length;

                      mgIds_ExIds.forEach(function (mgId_ExId) {

                          Azure.table("exercises").read({
                              where: {
                                  id: mgId_ExId.exerciseId
                              },
                              success: function (ex) {
                                  start++;
                                  exercises.push(ex[0]);

                                  if (start == num) {
                                      Notifier.done();

                                      callback(exercises);
                                  }

                              }
                          })

                      })

                  }

              }, Notifier.error)
          },
      };
  });





