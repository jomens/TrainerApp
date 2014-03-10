'use strict';

angular.module('TrainerApp')
  .controller('InstitutionportalCtrl', function ($scope, $location) {

      init();

      function init() {
      }

      $scope.editUser = function () {
          //$location.path('/myClients/').search("dest", "boom");
          $location.path('/myTrainers/').search({ dest: "editClient", param: "id" });
      }
  });
