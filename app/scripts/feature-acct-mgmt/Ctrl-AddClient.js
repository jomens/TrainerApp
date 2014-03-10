'use strict';

angular.module('TrainerApp')
  .controller('AddclientCtrl', function ($scope, UserService, Models, Identity, Nav) {

      init();

      function init() {
          $scope.client = Models.User();
          
      }

      $scope.addClient = function () {
         
          UserService.addUser($scope.client, function () {
              Nav.clients();
          });

      }

      $scope.$watch("client.gender",
                    function (newValue, oldValue) {

                        $scope.client.imageUrl = getImage(newValue);

                    }
                );

      function getImage(gender) {

          var baseUrl = "http://api.randomuser.me/0.2/portraits/";
          var g = {
              "F": "women",
              "M": "men"
          };

          return baseUrl + g[gender] + "/" + Math.ceil(Math.random() * 20) + ".jpg";
      }
  });

