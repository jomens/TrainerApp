'use strict';

angular.module('TrainerApp')
.factory("Azure", ["$resource", "Environment", "Notifier",
    function ($resource, Environment, Notifier) {
        var azureClient = new WindowsAzure.MobileServiceClient('https://trainerapp.azure-mobile.net', 'zhlqVKKbFuYRyxvFatNOtEUpoCzmQQ84');

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
        FitnessChainResource: function () {
            return getResource("fitnesschains");
        },
        FitnessCenterResource: function () {
            return getResource("fitnesscenters");
        },
        UserResource: function () {
            return getResource("users");
        },
        ExerciseResource: function () {
            return getResource("exercises");
        },
        RoutineResource: function () {
            return getResource("routines");
        },
        TrainingSessionResource: function () {
            return getResource("trainingsession");
        },
        WorkoutResource: function () {
            return getResource("workouts");
        },
        CardioWorkoutResource: function () {
            return getResource("workouts_cardio");
        },
        //getTable: function (tableName) {
        //    return azureClient.getTable(getTableByEnvironment(tableName));
       // },
        table: function table(tableName){
            tableName = getTableByEnvironment(tableName);
            var azureTable = azureClient.getTable(tableName);

            return {
                read: function (options) {
                    Notifier.busy();

                    var readPromise; 
                    if (options.where) {
                        if (options.where.fn) {
                            readPromise = azureTable.where(options.where.fn, options.where.param).read();
                        }
                        else {
                            readPromise = azureTable.where(options.where).read();
                        }
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
        invokeApi: function (options) {
            Notifier.busy();
            azureClient.invokeApi(options.api, { body: options.body || null, method: options.method || "get" })
            .done(function (results) {
                if (options.success) {
                    options.success(results);
                }
              
              Notifier.done("Data loaded");

            }, Notifier.error);
        }
    };
}]);