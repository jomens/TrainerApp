'use strict';

angular.module('TrainerApp')
  .controller('LoginCtrl', function ($scope, $rootScope) {

      init();

      function init() {
          $rootScope.title = "Login";
          $rootScope.subTitle = "";

      }
  });
