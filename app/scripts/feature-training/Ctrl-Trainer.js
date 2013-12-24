'use strict';

angular.module('TrainerApp')
  .controller('TrainerCtrl', function ($scope, Settings, LocalStorage, $rootScope) {

      init();

      function init() {
          $rootScope.title = "TRAINER PORTAL";
          $rootScope.subTitle = "";

          Settings.init();
          $scope.trainer = LocalStorage.getTrainer();
      }

  });
