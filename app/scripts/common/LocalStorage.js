'use strict';

angular.module('TrainerApp')
  .factory('LocalStorage', function () {

      var trainer;
      var loggedInUser;
      var currentClient;
      var currentRoutine;
      var currentWorkout;
      var session;
      var allExercises;
      var settings;

      // Public API here
      return {
          setLoggedInUser: function (user) {
              amplify.store("loggedInUser", user);
              loggedInUser = user;
          },
          getLoggedInUser: function () {
              loggedInUser = loggedInUser || amplify.store("loggedInUser");
              return loggedInUser;
          },
          setTrainer: function (tr) {
              amplify.store("trainer", tr);
              trainer = tr;
          },
          getTrainer: function () {
              trainer = trainer || amplify.store("trainer");
              return trainer;
          },
          setCurrentClient: function (cc) {
              amplify.store("currentclient", cc);
              currentClient = cc;
          },
          getCurrentClient: function () {
              currentClient = currentClient || amplify.store("currentclient");
              return currentClient;
          },

          setCurrentRoutine: function (rtn) {
              amplify.store("currentroutine", rtn);
              currentRoutine = rtn;
          },
          getCurrentRoutine: function () {
              currentRoutine = currentRoutine || amplify.store("currentroutine");
              return currentRoutine;
          },

          setCurrentWorkout: function (wkt) {
              amplify.store("currentworkout", wkt);
              currentWorkout = wkt;
          },
          getCurrentWorkout: function () {
              currentWorkout = currentWorkout || amplify.store("currentworkout");
              return currentWorkout;
          },

          getRoutineDetails: function () {
                  return amplify.store("routineDetails");

          },

          setRoutineDetails: function(rtnDetails){
              amplify.store("routineDetails", rtnDetails);

          },

          setTrainingSession: function (ts) {
              amplify.store("session", ts);
              session = ts;
          },
          getTrainingSession: function () {
              session = session || amplify.store("session");
              return session;
          },

          setSettings: function (st) {
              amplify.store("settings", st);
              settings = st;
          },
          getSettings: function () {
              settings =  settings || amplify.store("settings");
              return settings;
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
