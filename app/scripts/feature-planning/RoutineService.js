'use strict';

angular.module('TrainerApp')
  .factory('RoutineService', function (Azure, LocalStorage, Notifier) {

      //fetch all exercises

      //save them to local storage?

      //group them by bodyparts

      //filter by categories
      return {
          fetchAllExercises: function (callback) {
              var allEx = LocalStorage.getAllExercises();
              if (allEx) {
                  console.log("allEx length is " + allEx.length);

                  callback(allEx);
              } 
              else { 
                  Azure.ExerciseResource().query({}, function (results) {
                      console.log("results length is " + results.length);
                      LocalStorage.setAllExercises(results);
                      callback(results);
                  }, Notifier.error) 
              }          
      }
    };
  });
