'use strict';

angular.module('TrainerApp')
  .controller('FitnesscenterportalCtrl', function ($scope, $rootScope) {

      init();

      function init() {
          $rootScope.title = "Fitness Center portal";
          $rootScope.subTitle = "";
      }
  });
