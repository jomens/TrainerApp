'use strict';

angular.module('TrainerApp')
  .controller('CreateroutineCtrl', function ($scope, RoutineService, Models) {

      var allExercises;

      RoutineService.fetchAllExercises(function (all) {
          allExercises = all;
          $scope.exercises = all;
      });

      $scope.split = function (tags) {
          return tags.split(",").map(function (tag) {
              return Models.Tags[$.trim(tag)];
          })
      }
  });
