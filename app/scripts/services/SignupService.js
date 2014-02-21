'use strict';

angular.module('TrainerApp')
 .factory("SignupService", function (Models, Azure, Notifier, $location, LocalStorage, Identity, UserService) {

         return {
             addFitnessOrg: function (org, admins) {

                 Notifier.busy(true);
                 //admin.isAdmin = true;

                 Azure.FitnessOrgResource().save(org, function (savedOrg) {

                     admins.forEach(function (admin) {
                        admin.fitnessOrgId = savedOrg.id;
                        admin.isAdmin = true;
                        admin.pin = "0000";

                        if (admin.email) {
                            UserService.addUser(admin);
                        }

                     })

                 }, Notifier.errorHandler);
             },
             addFitnessCenter: function (fitnessCenter, admin, success) {

                 var that = this;
                 Notifier.busy(true); 
                 fitnessCenter.fitnessOrgId = Identity.getLoggedInUser().fitnessOrgId;

                 Azure.FitnessCenterResource().save(fitnessCenter, function (savedGym) {
                     admin.isAdmin = true;
                     admin.pin = "0000";
                     admin.fitnessCenterId = savedGym.id;
                     admin.fitnessOrgId = Identity.getLoggedInUser().fitnessOrgId;
                     UserService.addUser(admin);

                     success();

                 }, Notifier.errorHandler); 
             },
         }
     })

