'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, LocalStorage, $rootScope) {
      $scope.trainer = LocalStorage.getTrainer();

      init();

      function init() {
          $rootScope.title = "TRAINER";
          $rootScope.subTitle = "METRO";
      }
  });
