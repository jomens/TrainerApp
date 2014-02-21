'use strict';

angular.module('TrainerApp')
  .factory('Nav', function ($location, $rootScope) {
   
      function go(path) {
          $location.path("/" + path || "");
      }

    return {
      home: function () {
          go();
      },
      login: function () {
          go("login");
      },
      //Users
      trainers: function () {
          go("mytrainers");
      },
      clients: function () {
          go("myclients");
      },
      portal: function () {

          var user = $rootScope.loggedInUser;

          switch (user.userType) {
              case "trainer":
                  go("trainer");
                  break;
              case "fitnessorgadmin":
                  go("fitnessOrgPortal");
                  break;
              case "fitnesscenteradmin":
                  go("fitnessCenterPortal");
                  break;
              case "user":
                  go("userPortal");
                  break;
              default:
                  go("userPortal");

          }
      }
    };
  });
