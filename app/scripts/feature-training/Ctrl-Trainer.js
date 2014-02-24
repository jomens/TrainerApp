'use strict';

angular.module('TrainerApp')
  .controller('TrainerCtrl', function ($scope, Settings, Identity, $location) {

      init();

      function init() {
          $scope.trainer = Identity.getLoggedInUser();

         // $(document).foundation();
      }

      $scope.editUser = function () {
          //$location.path('/myClients/').search("dest", "boom");
          $location.path('/myClients/').search({ dest: "editClient", param: "id" });
      }

  });
