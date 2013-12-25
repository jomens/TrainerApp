'use strict';

angular.module('TrainerApp')
  .controller('LoginCtrl', function ($scope, $rootScope, Identity, $location) {

      init();

      function init() {
          $rootScope.title = "Login";
          $rootScope.subTitle = "";

      }

      $scope.login = function () {
          Identity.login($scope.login, function () {
              $location.path("/");
              $scope.$apply();
          });
      }
  });
