'use strict';

angular.module('TrainerApp')
  .factory('TrainerService', function (Azure, Notifier, LocalStorage, Models, $location, Identity) {
      var loggedInUser = Identity.getLoggedInUser();
      function routineDetails(rtn) {

      }

    return {
        getClients: function (callback) {
            Notifier.busy();
            loggedInUser = Identity.getLoggedInUser();
            Azure.table("users").read({
                where: {
                    fn: function (trId) {
                        return this.trainerId == trId;
                    },
                    param: loggedInUser.id
                },
                success: function (clients) {
                    callback(clients);
                }
            })
        },
        getTrainers: function (callback) {
            Notifier.busy();
            loggedInUser = Identity.getLoggedInUser();
            Azure.table("users").read({
                where: {
                    fitnessCenterId: loggedInUser.fitnessCenterId,
                    userType : "trainer"
                },
                success: function (trainers) {
                    callback(trainers);
                }
            })
        },
        getRoutines: function (callback) {
            Notifier.busy();
            loggedInUser = Identity.getLoggedInUser();
            Azure.table("routines").read({
                where: {
                    fn: function (trId) {
                        return this.trainerId == trId;
                    },
                    param: loggedInUser.id
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

            var trainingSession = LocalStorage.getTrainingSession();
            workout.trainingSessionId = trainingSession.id;
            workout.userId = trainingSession.userId;
            workout.exerciseId = ex.id;
            workout.exerciseName = ex.name;

            LocalStorage.setCurrentWorkout(workout);
        },
        getCurrentWorkout: function(){
            return LocalStorage.getCurrentWorkout();
        },
        getLastWorkout: function (callback) {
            var currentWorkout = this.getCurrentWorkout();

            Azure.table("workouts").read({
                where: {
                    exerciseId: currentWorkout.exerciseId,
                    userId: currentWorkout.userId
                },
                take: 1,
                orderByDescending: "__createdAt",
                success: function (result) {
                    callback(result);
                },
                error: Notifier.errorHandler
            });
               
        },
        getWorkoutSets: function(wkt, callback){
            Azure.table("sets").read({
                where: {
                    workoutId: wkt.id,
                },
                orderBy: "__createdAt",
                success: function (result) {
                    callback(result);
                },
                error: Notifier.errorHandler
            });
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
            var resource = {};
            if (workout.workoutType == "cardio") {
                workout.endTime = new Date();
                delete workout.workoutType;
                resource = Azure.CardioWorkoutResource();
            }
            else {
                resource = Azure.WorkoutResource();
            }

            resource.save(workout, function (savedWorkout) {
                Notifier.done();
                LocalStorage.setCurrentWorkout(null);
                //console.log(savedWorkout);
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
               // console.log("training in progress");
                return;
            }

            var session = Models.TrainingSession();
            session.date = new Date();
            session.userId = LocalStorage.getCurrentClient().id;
            session.trainerId = Identity.getLoggedInUser().id;
            session.routineId = LocalStorage.getCurrentRoutine().id;

            Azure.TrainingSessionResource().save(session, function (savedSession) {

                LocalStorage.setTrainingSession(savedSession);
               // Notifier.done("Training session created", true);

            }, Notifier.errorHandler);
        },
        endTrainingSession: function (callback) {
            //update session end date and set current session to null, set routine details to null
            var that = this;
            var sessionId = LocalStorage.getTrainingSession().id;

            //Azure.table("workouts").read({
            //    where: {
            //        fn: function (sessionId) {
            //            return this.trainingSessionId == sessionId;
            //        },
            //        param: sessionId
            //    },
            //    success: function (data) {
            //        callback(data);
                    
            //    }
            //})

            Azure.invokeApi({
                api: "getworkoutsummary?sessionId=" + sessionId,
                //body: { sessionId: sessionId },
                success: function (results) {
                    var jsonResult = JSON.parse(results.response);
                    callback(jsonResult);

                   // that.resetTrainingInfo();
                    //console.log(jsonResult);
                }
            });
        },
        resetTrainingInfo: function () {
            LocalStorage.setCurrentClient(null);
            LocalStorage.setCurrentRoutine(null);
            LocalStorage.setCurrentWorkout(null);
            LocalStorage.setRoutineDetails(null);
            LocalStorage.setTrainingSession(null);
        }


    }

  });
