'use strict';

angular.module('TrainerApp')
 .factory("Signup", function (Models, Azure, Notifier, $location, LocalStorage, Identity) {

         return {
             addUser: function (user) {

                 Notifier.busy(true);

                 Azure.UserResource().save(user, function (savedUser) {

                     Notifier.done("Success. account created", true);
                         $location.path("/");

                 }, Notifier.errorHandler);
             },
             addFitnessChain: function (chain, admin) {

                 var that = this;
                 Notifier.busy(true);
                 admin.isAdmin = true;
                 admin.userType = "fitnesschainadmin";

                 Azure.FitnessChainResource().save(chain, function (savedChain) {

                     admin.fitnessChainId = savedChain.id;

                     that.addUser(admin);

                 }, Notifier.errorHandler);
             },
             addFitnessCenter: function (fitnessCenter, admin) {

                 var that = this;
                 Notifier.busy(true); 
                 admin.isAdmin = true;
                 admin.userType = "fitnesscenteradmin";
                 fitnessCenter.fitnessChainId = Identity.getLoggedInUser().fitnessChainId;

                 Azure.FitnessCenterResource().save(fitnessCenter, function (savedGym) {
                     admin.fitnessCenterId = savedGym.id;
                     that.addUser(admin);

                 }, Notifier.errorHandler); 
             },
         }
     })

