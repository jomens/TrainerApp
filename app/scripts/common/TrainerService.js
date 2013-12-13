'use strict';

angular.module('TrainerApp')
  .factory('TrainerService', function (Azure, Notifier, LocalStorage) {
   
    return {
        getClients: function (callback) {
            var trainer = LocalStorage.getTrainer();
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
      }
    };
  });
