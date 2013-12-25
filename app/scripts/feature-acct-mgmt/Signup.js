'use strict';

angular.module('TrainerApp')
 .factory("Signup", function (Models, Azure, Notifier, $location, LocalStorage) {

         return {
             addUser: function (user) {

                 Notifier.busy(true);

                 Azure.UserResource().save(user, function (savedUser) {

                     Notifier.done("Success. account created", true);
                    // if (savedUser.userType == "trainer") {
                     //    LocalStorage.setTrainer(savedUser);
                    //     $location.path("/trainer");
                    // }
                    /// else {
                         $location.path("/");
                    // }

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
                 fitnessCenter.fitnessChainId = "E9FB6D15-0558-41AC-BFB8-01411E63B329";

                 Azure.FitnessCenterResource().save(fitnessCenter, function (savedGym) {
                     admin.fitnessCenterId = savedGym.id;
                     that.addUser(admin);

                 }, Notifier.errorHandler); 
             },
         }
     })

