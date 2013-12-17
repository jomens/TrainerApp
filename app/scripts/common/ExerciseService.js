'use strict';

angular.module('TrainerApp')
  .factory('ExerciseService', function (Models, Azure, LocalStorage) {

      return {
          fetchAllExercises: function (callback) {
              
              var bodyParts = this.getBodyParts();
              var numBodyParts = bodyParts.length;
              var dataLoadCount = 0;
              console.log("Fetching exercises");
              console.log(new Date());

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
          getExerciseFromRoutine: function (routine) {
              var cachedRoutines = LocalStorage.getRoutineDetails();
              if (cachedRoutines) {
                  console.log("getting from cache");
                  return cachedRoutines;
              }
              console.log("no cache");
              var rt_bodyParts = routine.bodyParts.split(",");
              var rt_exercideIds = routine.exerciseIds.split(",");

              var found = {};
              var list = []; 

              rt_bodyParts.forEach(function (bodypart) {
                  var exs = LocalStorage.getExercises($.trim(bodypart)) || [];

                  exs.forEach(function (ex) {
                      if ($.inArray(ex.id, rt_exercideIds) != -1) {
                          if(!found[ex.id]){
                             list.push(ex);
                          found[ex.id] = true;
                        }
                      
                      }
                  });

              });

              LocalStorage.setRoutineDetails(list);

              return list;
          },
          
    };
  });
