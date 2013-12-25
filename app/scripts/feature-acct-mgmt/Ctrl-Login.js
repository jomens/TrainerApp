'use strict';

angular.module('TrainerApp')
  .controller('LoginCtrl', function ($scope, $rootScope, Identity) {

      init();

      function init() {
          $rootScope.title = "Login";
          $rootScope.subTitle = "";

      }

      $scope.login = function () {
          Identity.login($scope.login, function () {
              console.log("inside callback");
              $scope.$apply();
          });
      }
  });
