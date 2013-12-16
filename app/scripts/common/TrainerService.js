'use strict';

angular.module('TrainerApp')
  .factory('TrainerService', function (Azure, Notifier, LocalStorage) {

    var trainer = LocalStorage.getTrainer();

    return {
        getClients: function (callback) {
            Notifier.busy();

            Azure.table("clients").read({
                where: {
                    fn: function (trId) {
                        return this.trainerId == trId;
                    },
                    param: trainer.id
                },
                success: function (clients) {
                    callback(clients);
                }
            })
        },
        getRoutines: function (callback) {
            Notifier.busy();

            Azure.table("routines").read({
                where: {
                    fn: function (trId) {
                        return this.trainerId == trId;
                    },
                    param: trainer.id
                },
                success: function (routines) {
                    callback(routines);
                }
            })
        },
        setCurrentClient: function (client) {
            //save to azure???
            LocalStorage.setCurrentClient(client);
        },
        getCurrentClient: function () {
            //save to azure???
            return LocalStorage.getCurrentClient();
        },
        setCurrentRoutine: function (routine) {
            //save to azure???
            LocalStorage.setCurrentRoutine(routine);
        },
        getCurrentRoutine: function () {
            //save to azure???
            return LocalStorage.getCurrentRoutine();
        }
    }

  });
