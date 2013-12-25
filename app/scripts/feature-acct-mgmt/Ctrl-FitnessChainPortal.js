'use strict';

angular.module('TrainerApp')
  .controller('FitnesschainportalCtrl', function ($scope, $rootScope) {

      init();

      function init() {
          $rootScope.title = "Fitness Chain portal";
          $rootScope.subTitle = "";
      }
  });
