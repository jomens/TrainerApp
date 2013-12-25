'use strict';

angular.module('TrainerApp')
  .controller('MainCtrl', function ($scope, $rootScope, Identity, $location) {
      init();

      function init() {
          $rootScope.title = "TRAINER";
          $rootScope.subTitle = "METRO";

          Identity.getLoggedInUser();
      }

      $scope.gotoUserPortal = function () {
         
          var user = $scope.loggedInUser;
          switch (user.userType) {
              case "trainer":
                  $location.path("/trainer");
                  break;
              case "fitnesschainadmin":
                  $location.path("/fitnessChainPortal");
                  break;
              case "fitnesscenteradmin":
                  $location.path("/fitnessCenterPortal");
                  break;
              case "user":
                  $location.path("/userPortal");
                  break;
          }
      };
  });
