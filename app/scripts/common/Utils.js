'use strict';

angular.module('TrainerApp')
  .factory('Utils', function (LocalStorage, ExerciseService) {
   
    
    return {
        parseObject: function (obj) {
            var arr = [];
            for (var key in obj) {
                arr.push({ key: key, value: obj[key] });
            }
            return arr;
      }
    };
  });
