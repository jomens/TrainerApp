'use strict';

angular.module('TrainerApp')
  .controller('AllLocationsCtrl', function ($scope, AccountService, $rootScope, $location) {

      init();

      function init() {
          AccountService.getLocations(function (locations) {
              $scope.locations = locations;
             
          }, function (err) {
              console.log(err);
          });

      }

      $scope.clientSelected = function (client) {
          //var locationParams = $location.search();

         // if (locationParams && locationParams.dest) {
        //      $location.path("/" + locationParams.dest + "/" + client[locationParams.param]).search({});
        //  } else {
              //TrainerService.setCurrentClient(client);
         //     $location.path("/userProfile/" + client.id);

        //  }

      }
  });
