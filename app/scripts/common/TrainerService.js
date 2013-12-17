'use strict';

angular.module('TrainerApp')
  .factory('TrainerService', function (Azure, Notifier, LocalStorage, Models) {

      var trainer = LocalStorage.getTrainer();
      function routineDetails(rtn) {

      }

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
        },
        setCurrentWorkout: function (ex) {
            var workout = Models.Workout();
            workout.trainingSessionId = LocalStorage.getTrainingSession().id;
            workout.exerciseId = ex.id;
            workout.exerciseName = ex.name;

            LocalStorage.setCurrentWorkout(workout);
        },
        getCurrentWorkout: function(){
            return LocalStorage.getCurrentWorkout();
        },
        addSetToWorkout: function (set) {
            var newSet = Models.Set();
            newSet.weight = set.weight;
            newSet.reps = set.reps;

            var workout = LocalStorage.getCurrentWorkout();
            workout.sets.push(newSet);

            LocalStorage.setCurrentWorkout(workout);

            return LocalStorage.getCurrentWorkout();

        },
        saveWorkout: function(workout){

        },
        startTrainingSession: function () {
            if (LocalStorage.getTrainingSession()) {
                console.log("training in progress");
                return;
            }

            var session = Models.TrainingSession();
            session.date = new Date();
            session.clientId = LocalStorage.getCurrentClient().id;
            session.trainerId = LocalStorage.getTrainer().id;
            session.routineId = LocalStorage.getCurrentRoutine().id;
            console.log(session);

            Azure.TrainingSessionResource().save(session, function (savedSession) {

                LocalStorage.setTrainingSession(savedSession);
                console.log("Saved " + savedSession);

            }, Notifier.errorHandler);
        },
        endTrainingSession: function () {
            //update session end date and set current session to null, set routine details to null
        }

    }

  });
