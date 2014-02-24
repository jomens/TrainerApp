'use strict';

angular.module('TrainerApp')
  .factory("Amplify", function () {
      //var amplify =  amplify || {};
      return amplify;
  })
  .factory('LocalStorage', function (Amplify) {
      var trainer;
      var loggedInUser;
      var currentClient;
      var currentRoutine;
      var currentWorkout;
      var session;
      var allExercises;
      var settings;

      var StorageItem = function (key) {
          this.key = key;
          this.value = null;

          this.set = function (data) {
              Amplify.store(key, data);
              this.value = data;
          }

          this.get = function () {
              this.value = this.value || Amplify.store(this.key);
              return this.value;
          }
      }

      function setupStorageItem(item, key) {
          item = item || new StorageItem(key);
          return item;
      }

      // Public API here
      return {
          loggedInUser: function () { return setupStorageItem(loggedInUser, "loggedInUser"); },
          setLoggedInUser: function (user) {
              Amplify.store("loggedInUser", user); 
              loggedInUser = user;
          },
          getLoggedInUser: function () {
              loggedInUser = loggedInUser || Amplify.store("loggedInUser");
              return loggedInUser;
          },
          setCurrentClient: function (cc) {
              Amplify.store("currentclient", cc);
              currentClient = cc;
          },
          getCurrentClient: function () {
              currentClient = currentClient || Amplify.store("currentclient");
              return currentClient;
          },

          setCurrentRoutine: function (rtn) {
              Amplify.store("currentroutine", rtn);
              currentRoutine = rtn;
          },
          getCurrentRoutine: function () {
              currentRoutine = currentRoutine || Amplify.store("currentroutine");
              return currentRoutine;
          },

          setCurrentWorkout: function (wkt) {
              Amplify.store("currentworkout", wkt);
              currentWorkout = wkt;
          },
          getCurrentWorkout: function () {
              currentWorkout = currentWorkout || Amplify.store("currentworkout");
              return currentWorkout;
          },

          getRoutineDetails: function () {
                  return Amplify.store("routineDetails");

          },

          setRoutineDetails: function(rtnDetails){
              Amplify.store("routineDetails", rtnDetails);

          },
          getVersion: function () {
              return Amplify.store("version");

          },

          setVersion: function(version){
              Amplify.store("version", version);

          },

          setTrainingSession: function (ts) {
              Amplify.store("session", ts);
              session = ts;
          },
          getTrainingSession: function () {
              session = session || Amplify.store("session");
              return session;
          },

          setSettings: function (st) {
              Amplify.store("settings", st);
              settings = st;
          },
          getSettings: function () {
              settings =  settings || Amplify.store("settings");
              return settings;
          },

          //setAllExercises: function (exs) {
          //    Amplify.store("allexercises", exs);
          //    allExercises = exs;
          //},
          //getAllExercises: function () {
          //    return allExercises || Amplify.store("allexercises");
          //},
          setExercises: function (bodyPart, exs) {
              Amplify.store(bodyPart + "-exercises", exs);
          },
          getExercises: function (bodyPart) {
              return Amplify.store(bodyPart + "-exercises");
          }

      };
  });
