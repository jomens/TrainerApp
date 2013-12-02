'use strict';

angular.module('TrainerApp')
 .factory("Signup", function (Models, Azure, Notifier, $location) {

         return {
             saveTrainer: function (trainer) {

                //Notifier.busy(true); 

                 //account.timestamp = new Date();
                 //admin.timestamp = new Date();

                 
                 Azure.TrainerResource().save(trainer, function (savedTrainer) {

                    
                     Notifier.done("Success. Trainer created", true);
                   
                     $location.path("/");

                 }, Notifier.errorHandler); 
             }
         }
     })

