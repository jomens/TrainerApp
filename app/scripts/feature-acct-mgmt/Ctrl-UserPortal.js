'use strict';

angular.module('TrainerApp')
  .controller('UserportalCtrl', function ($scope, $rootScope, Identity, TrainerService) {

      init();

      function init() {
          $rootScope.title = "User portal";
          $rootScope.subTitle = "";

          //TrainerService.setCurrentClient(client);
          TrainerService.setCurrentClient(Identity.getLoggedInUser());
      }
  });
