'use strict';

angular.module('TrainerApp')
  .controller('AddSiteCtrl', function ($scope, SignupService, Models, Nav) {

      init();

      function init() {
          $scope.gym = Models.Site();
          var admin = Models.SiteAdmin();

          $scope.admin = admin;
      }

      $scope.addSite = function () {
          SignupService.addSite($scope.gym, $scope.admin, function () {
              Nav.portal();
          });
         
      }
  });
