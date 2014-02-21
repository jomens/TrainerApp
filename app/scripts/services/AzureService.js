'use strict';

angular.module('TrainerApp')
.factory("AzureClient", function () {
    return  new WindowsAzure.MobileServiceClient('https://trainerapp.azure-mobile.net', 'zhlqVKKbFuYRyxvFatNOtEUpoCzmQQ84');
})
.factory("AzureTable", function (AzureClient, Environment, Notifier) {

    function getTableByEnvironment(tb) {

        if (Environment == "PROD") {
            return tb;
        }
        return "TEST_" + tb;
    }


    return {
        table: function table(tableName) {
            tableName = getTableByEnvironment(tableName);
            var azureTable = AzureClient.getTable(tableName);

            return {
                read: function (options) {
                    Notifier.busy();

                    var query;
                    if (options.where) {
                        if (options.where.fn) {
                            query = azureTable.where(options.where.fn, options.where.param);
                        }
                        else {
                            query = azureTable.where(options.where);
                        }
                    }
                    else {
                        query = azureTable;
                    }

                    if (options.take) {
                        query.take(options.take);
                    }
                    if (options.orderBy) {
                        query.orderBy(options.orderBy);
                    }
                    if (options.orderByDescending) {
                        query.orderByDescending(options.orderByDescending);
                    }
                    query.read().done(function (data) {
                        Notifier.done(options.msg);
                        options.success(data);
                }, options.error || Notifier.errorHandler)
        }
            }
        },
        invokeApi: function (options) {
            Notifier.busy();
            AzureClient.invokeApi(options.api, { body: options.body || null, method: options.method || "get" })
            .done(function (results) {
                if (options.success) {
                    options.success(results);
                }

                Notifier.done("Data loaded");

            }, Notifier.error);
        },
        Client: function () {
            return AzureClient;
        }
    }
})
.factory("AzureResource", function ($resource) {
    //TODO
})
.factory("Azure", ["$resource", "Environment", "Notifier", "AzureTable",
function ($resource, Environment, Notifier, AzureTable) {
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
        FitnessOrgResource: function () {
            return getResource("fitnessorgs");
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
        Routine_Exercise_Resource: function () {
            return getResource("routine_exercises");
        },
        Routine_Assignments_Resource: function () {
            return getResource("routine_assignments");
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
        PersonalBestResource: function () {
            return getResource("personal_best");
        },
        table: function(tblName){
            return AzureTable.table(tblName);
        },
        invokeApi: AzureTable.invokeApi,
        Client: AzureTable.Client
    };
}]);