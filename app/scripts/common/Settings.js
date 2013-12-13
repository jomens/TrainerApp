'use strict';

angular.module('TrainerApp')
  .factory('Settings', function (LocalStorage, ExerciseService) {
   
    
    return {
        init: function () {
            var settings = LocalStorage.getSettings();
          if (!settings) {
              ExerciseService.fetchAllExercises();
          }
      }
    };
  });
