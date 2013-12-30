'use strict';

angular.module('TrainerApp')
  .controller('UserportalCtrl', function ($scope, Identity, TrainerService) {

      init();

      function init() {

          //TrainerService.setCurrentClient(client);
          TrainerService.setCurrentClient(Identity.getLoggedInUser());
      }
  });
