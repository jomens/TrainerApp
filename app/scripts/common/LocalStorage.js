'use strict';

angular.module('TrainerApp')
  .factory('LocalStorage', function () {
    
      var trainer;

    // Public API here
    return {
      setTrainer: function (tr) {
          amplify.store("trainer", tr);
          trainer = tr;
      },
      getTrainer: function () {
          return trainer || amplify.store("trainer");
      }
    };
  });
