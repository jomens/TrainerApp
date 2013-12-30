'use strict';

angular.module('TrainerApp')
  .controller('LoginCtrl', function ($scope, Identity, $location) {

      init();

      function init() {
      }

      $scope.login = function () {
          Identity.login($scope.login, function () {
              $location.path("/");
              $scope.$apply();
          });
      }
  });
