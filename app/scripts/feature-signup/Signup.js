'use strict';

angular.module('TrainerApp')
 .factory("Signup", function (Models, Azure, Notifier, $location, LocalStorage) {

         return {
             saveTrainer: function (trainer) {

                //Notifier.busy(true); 

                 //account.timestamp = new Date();
                 //admin.timestamp = new Date();

                 
                 Azure.TrainerResource().save(trainer, function (savedTrainer) {
                    
                     Notifier.done("Success. Trainer created", true);
                     LocalStorage.setTrainer(savedTrainer);
                     $location.path("/admin");

                 }, Notifier.errorHandler); 
             },
             saveClient: function (user) {
                 user.trainerId = LocalStorage.getTrainer().id;

                 Azure.ClientResource().save(user, function (savedUser) {

                     Notifier.done("Success. Client added", true);
                     $location.path("/trainer");

                 }, Notifier.errorHandler);
             }
         }
     })

