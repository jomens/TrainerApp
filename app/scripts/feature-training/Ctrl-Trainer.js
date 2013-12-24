'use strict';

angular.module('TrainerApp')
  .controller('TrainerCtrl', function ($scope, Settings, LocalStorage) {

      init();

      function init() {
          Settings.init();
          $scope.trainer = LocalStorage.getTrainer();
      }

  });
