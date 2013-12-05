'use strict';

angular.module('TrainerApp')
  .controller('SuperadminCtrl', function ($scope, DataImport, Azure) {
    
      $scope.loadExercises = function () {

          console.log("imports length" + DataImport.Exercises.length);
          Azure.invokeApi({
              api: "loadexercises",
              method: "post",
              body: DataImport.Exercises,
              success: function (results) {
                  console.log(results);
              }
          });
      }
  });
