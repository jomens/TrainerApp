'use strict';

angular.module('TrainerApp')
 .factory("SignupService", function (Models, Azure, Notifier, $location, LocalStorage, Identity, UserService) {

         return {
             addInstitution: function (org, admins, callback) {

                 Notifier.busy(true);
                 //admin.isAdmin = true;

                 Azure.InstitutionResource().save(org, function (savedOrg) {

                     admins.forEach(function (admin) {
                        admin.institutionId = savedOrg.id;
                        admin.isAdmin = true;
                        admin.pin = "0000";

                        if (admin.email) {
                            Azure.UserResource().save(admin, function (savedUser) {

                               // Notifier.done("Success. account created", true);

                                if (callback) {
                                    callback(savedUser);
                                }

                            }, Notifier.errorHandler);
                        }

                     })

                 }, Notifier.errorHandler);
             },
             addSite: function (site, admin, success) {

                 var that = this;
                 Notifier.busy(true); 
                 site.institutionId = Identity.getLoggedInUser().institutionId;

                 Azure.SiteResource().save(site, function (savedGym) {
                     admin.isAdmin = true;
                     admin.pin = "0000";
                     admin.siteId = savedGym.id;
                     admin.institutionId = Identity.getLoggedInUser().institutionId;
                     UserService.addUser(admin);

                     success();

                 }, Notifier.errorHandler); 
             },
         }
     })

