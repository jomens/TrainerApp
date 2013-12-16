'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, LocalStorage) {
      $scope.trainer = LocalStorage.getTrainer();
  });
