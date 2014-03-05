'use strict';

angular.module('TrainerApp')
  .factory('Settings', function (LocalStorage, ExerciseService, Identity, Nav) {
      var dataVersion = 3;
    
    return {
        init: function () {
            var settings = LocalStorage.getSettings();
          //if (!settings) {
              //ExerciseService.fetchAllExercises();
          //}
        },
        checkForUpdate: function () {
            var version = LocalStorage.getVersion();
            if (!version || version.dataVersion != dataVersion) {
                Identity.logout(function () {
                    LocalStorage.setVersion({ dataVersion: dataVersion })
                    Nav.login();
                });
            }
        }
    };
  });
