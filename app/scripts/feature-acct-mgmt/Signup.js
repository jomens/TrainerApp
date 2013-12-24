'use strict';

angular.module('TrainerApp')
 .factory("Signup", function (Models, Azure, Notifier, $location, LocalStorage) {

         return {
             addUser: function (user) {

                 Notifier.busy(true);

                 Azure.UserResource().save(user, function (savedUser) {

                     Notifier.done("Success. account created", true);
                     if (savedUser.userType == "trainer") {
                         LocalStorage.setTrainer(savedUser);
                         $location.path("/trainer");
                     }
                     else {
                         $location.path("/");
                     }

                 }, Notifier.errorHandler);
             },
             addFitnessChain: function (chain, admin) {

                 var that = this;
                 Notifier.busy(true); 
                 
                 Azure.FitnessChainResource().save(chain, function (savedChain) {

                     admin.fitnessChainId = savedChain.id;

                     that.addUser(admin);

                 }, Notifier.errorHandler); 
             },
         }
     })

