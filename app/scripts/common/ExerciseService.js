'use strict';

angular.module('TrainerApp')
  .factory('ExerciseService', function (Models, Azure, LocalStorage) {

      return {
          fetchAllExercises: function (callback) {
              
              var bodyParts = this.getBodyParts();

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
          }
    };
  });
