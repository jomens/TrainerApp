'use strict';

angular.module('TrainerApp')
.factory("Azure", ["$resource", "Environment", "Notifier",
    function ($resource, Environment, Notifier) {
        var azureClient = new WindowsAzure.MobileServiceClient('https://trainerapp.azure-mobile.net', 'MNrrNwDLswHBokqfjuZgRRYvCSIpmu44');

    function getTableByEnvironment(tb) {

        if (Environment == "PROD") {
            return tb;
        }
        return "TEST_" + tb;
    }

    function getResource(tableName) {

        tableName = getTableByEnvironment(tableName);


        var url = "https://trainerapp.azure-mobile.net/tables/tableName/:id"
        return $resource(url.replace("tableName", tableName), { id: '@id' }, { "update": { method: "PATCH", isArray: false } });
    }
    return {
        TrainerResource: function () {
            return getResource("trainers");
        },
        //AccountResource: function () {
        //    return getResource("accounts");
        //},
        getTable: function (tableName) {
            return azureClient.getTable(getTableByEnvironment(tableName));
        },
        table: function table(tableName){
            tableName = getTableByEnvironment(tableName);
            var azureTable = azureClient.getTable(tableName);

            return {
                read: function (options) {
                    Notifier.busy();

                    var readPromise;
                    if (options.where) {
                        readPromise = azureTable.where(options.where).read();
                    }
                    else {
                        readPromise = azureTable.read();
                    }

                    readPromise.done(function (data) {
                        Notifier.done(options.msg);
                        options.success(data);
                    }, options.error || Notifier.errorHandler)
                }
            }
        },
        invokeApi: function (apiname) {
            //azureClient.invokeApi("invitesapi"
        }
    };
}]);