'use strict';

angular.module('TrainerApp')
  .factory('Nav', function ($location, $rootScope) {
   
      function go(path, id) {
          if (id){
            return  $location.path("/" + path + "/" + id);
          }else{
          $location.path("/" + path || "");

          }
      }

    return {
        home: function () {
            go();
        },
        dashboard: function () {
            go("dashboard");
        },
        superadmin: function () {
            go("superadmin");
        },
        login: function () {
          go("login");
        },
        setRoutineTargets: function(rtnAssignmentId){
            return go("createRoutineTargets", rtnAssignmentId);
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
              case "institutionadmin":
                  go("institutionPortal");
                  break;
              case "siteadmin":
                  go("sitePortal");
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
