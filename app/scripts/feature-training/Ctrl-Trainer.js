'use strict';

angular.module('TrainerApp')
  .controller('TrainerCtrl', function ($scope, Settings, Identity) {

      init();

      function init() {
          Settings.init();
          $scope.trainer = Identity.getLoggedInUser();

         // $(document).foundation();
      }

  });
