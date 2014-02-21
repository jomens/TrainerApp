'use strict';

angular.module('TrainerApp')
 .factory("UserService", function (Models, Azure, Notifier, $location, LocalStorage, Identity) {

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
             addUser: function (user, callback) {

                 Notifier.busy(true);

                 Azure.UserResource().save(user, function (savedUser) {

                     Notifier.done("Success. account created", true);

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
                         $location.path("/dashboard");
                     }

                 }, Notifier.errorHandler);
            },

         }
     })

