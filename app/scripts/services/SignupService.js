'use strict';

angular.module('TrainerApp')
 .factory("SignupService", function (Models, Azure, Notifier, $location, LocalStorage, Identity, UserService) {

         return {
             addFitnessOrg: function (org, admins) {

                 var that = this;
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
             addFitnessCenter: function (fitnessCenter, admin) {

                 var that = this;
                 Notifier.busy(true); 
                 admin.isAdmin = true;
                 admin.userType = "fitnesscenteradmin";
                 fitnessCenter.fitnessOrgId = Identity.getLoggedInUser().fitnessOrgId;

                 Azure.FitnessCenterResource().save(fitnessCenter, function (savedGym) {
                     admin.fitnessCenterId = savedGym.id;
                     that.addUser(admin);

                 }, Notifier.errorHandler); 
             },
         }
     })

