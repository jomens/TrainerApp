'use strict';

angular.module('TrainerApp')
  .controller('PinresetCtrl', function ($scope, $rootScope) {

      init();

      function init() {
          $rootScope.title = "PIN Reset";
          $rootScope.subTitle = "";

      }
  });
