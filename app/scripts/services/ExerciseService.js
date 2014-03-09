'use strict';

angular.module('TrainerApp')
  .factory('ExerciseService', function (Models, Azure, LocalStorage, Notifier) {

      return {
          addExercise: function (options, callback, error) {
              Notifier.busy();

              Azure.ExerciseResource().save({ name: options.exerciseName }, function (savedEx) {

                  Notifier.done();
                  //options.muscleGroups = $scope.selectedMuscleGroups;
                  //options.exerciseCategories = $scope.selectedCategories

                  if (options.muscleGroups.length > 0) {
                      Notifier.busy();
                      options.muscleGroups.forEach(function(mgId){
                          Azure.MuscleGroup_Exercises_Resource().save({ exerciseId: savedEx.id, muscleGroupId: mgId },
                              function () {
                                  //callback?

                                  Notifier.done();
                                  if (callback) {
                                      callback(savedEx);
                                  }
                              }, Notifier.error);
                          
                          });
                  }

                  //if (options.exerciseCategories.length > 0) {

                  //    options.exerciseCategories.forEach(function (catId) {
                  //        Azure.Exercises_ExerciseCategory_Resource().save({ exerciseId: savedEx.id, exerciseCategoryId: catId },
                  //            function () {
                  //                //callback?
                  //            }, Notifier.error);

                  //    });
                  //}

                  //if (callback) {
                  //    callback(savedEx);
                  //}
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
              Azure.table("musclegroups_exercises").read({
                  where: { muscleGroupId: mgId },
                  success: function (mgIds_ExIds) {

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

                  }, error: Notifier.error
              });
          },
      };
  });





