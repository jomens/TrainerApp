'use strict';

angular.module('TrainerApp')
  .factory('LocalStorage', function () {
    
      var trainer;
      var allExercises;
      var settings;
           
    // Public API here
    return {
        setTrainer: function (tr) {
            amplify.store("trainer", tr);
            trainer = tr;
        },
        getTrainer: function () {
            return trainer || amplify.store("trainer");
        },
        setSettings: function (st) {
            amplify.store("settings", st);
            settings = st;
        },
        getSettings: function () {
            return settings || amplify.store("settings");

        },
        //setAllExercises: function (exs) {
      //    amplify.store("allexercises", exs);
      //    allExercises = exs;
      //},
      //getAllExercises: function () {
      //    return allExercises || amplify.store("allexercises");
      //},
      setExercises: function (bodyPart, exs) {
          amplify.store(bodyPart + "-exercises", exs);
      },
      getExercises: function (bodyPart) {
         return amplify.store(bodyPart + "-exercises");
      }

    };
  });
