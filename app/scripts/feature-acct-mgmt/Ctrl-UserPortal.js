'use strict';

angular.module('TrainerApp')
  .controller('UserportalCtrl', function ($scope, $rootScope) {

      init();

      function init() {
          $rootScope.title = "User portal";
          $rootScope.subTitle = "";
      }
  });
