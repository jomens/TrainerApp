'use strict';

angular.module('TrainerApp')
 .factory("AccountService", function (Models, Azure, Notifier, $location, LocalStorage, Identity) {

         return {
             getUserById: function (id, callback) {
                 Notifier.busy(true);

                 Azure.UserResource().get({ id: id }, function (savedUser) {

                     Notifier.done("", true);

                     if (callback) {
                         callback(savedUser);
                     }                  

                 }, Notifier.errorHandler);
             },
             updateUser: function (user, callback) {

             Notifier.busy(true);

             Azure.UserResource().update(user, function (savedUser) {

                 Notifier.done("", true);

                 if (callback) {
                     callback(savedUser);
                 }
                 else {
                     $location.path("/");
                 }

             }, Notifier.errorHandler);
         },

         }
     })

