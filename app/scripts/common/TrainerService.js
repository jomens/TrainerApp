'use strict';

angular.module('TrainerApp')
  .factory('TrainerService', function (Azure, Notifier, LocalStorage, Models, $location) {

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

            var currentRoutineDetails = LocalStorage.getRoutineDetails();

            if (currentRoutineDetails){

                if (routine.id != currentRoutineDetails.routineId) {
                    LocalStorage.setRoutineDetails(null)
                }
            }

        },
        getCurrentRoutine: function (routineId) {
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
        saveWorkout: function (workout) {
            Notifier.busy();
            Azure.WorkoutResource().save(workout, function (savedWorkout) {
                Notifier.done("Success. workout created", true);
                LocalStorage.setCurrentWorkout(null);

                removeExerciseFromRoutineDetails(workout.exerciseId);
                $location.path("/go");

            }, Notifier.errorHandler);

            function removeExerciseFromRoutineDetails(exId) {
                var rtnDetails = LocalStorage.getRoutineDetails();
                var filtered = rtnDetails.list.map(function (ex) {
                    if (ex.id == exId) {
                        ex.completed = true;
                    }

                    return ex;
                });

                rtnDetails.list = filtered;

                LocalStorage.setRoutineDetails(rtnDetails);
            }
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
                Notifier.done("Training session created", true);

            }, Notifier.errorHandler);
        },
        endTrainingSession: function (callback) {
            //update session end date and set current session to null, set routine details to null
            LocalStorage.setCurrentRoutine(null);
            LocalStorage.setCurrentWorkout(null);
            LocalStorage.setRoutineDetails(null);

            var sessionId = LocalStorage.getTrainingSession().id;

            Azure.table("workouts").read({
                where: {
                    fn: function (sessionId) {
                        return this.trainingSessionId == sessionId;
                    },
                    param: sessionId
                },
                success: function (data) {
                    callback(data);
                    
                }
            })

        }

    }

  });
