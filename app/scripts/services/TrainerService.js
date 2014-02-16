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
        getNonRemoteClients: function (callback) {
            Notifier.busy();
            loggedInUser = Identity.getLoggedInUser();

            Azure.table("users").read({
                where: {
                trainerId: loggedInUser.id,
                isRemote: false
                },
                success: function (clients) {
                    callback(clients);
                }
            })
        },
        getRemoteClients: function (callback) {
            Notifier.busy();
            loggedInUser = Identity.getLoggedInUser();
            Azure.table("users").read({
                where: {
                    trainerId: loggedInUser.id,
                    isRemote: true
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
                where: { createdBy : loggedInUser.id },
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
                $location.path("/go/");

            }, Notifier.errorHandler);

            function removeExerciseFromRoutineDetails(exId) {
                var rtnDetails = LocalStorage.getRoutineDetails();
                var filtered = rtnDetails.associatedExercises.map(function (ex) {
                    if (ex.id == exId) {
                        ex.completed = true;
                    }

                    return ex;
                });

                rtnDetails.associatedExercises = filtered;

                LocalStorage.setRoutineDetails(rtnDetails);
            }
        },
        startTrainingSession: function () {
            var that = this;
            if (LocalStorage.getTrainingSession()) {
               // console.log("training in progress");
                return;
            }
            var user = LocalStorage.getCurrentClient();
            var trainer = Identity.getLoggedInUser();

            var session = Models.TrainingSession();
            session.date = new Date();
            session.userId = user.id;
            session.trainerId = trainer.id;
            session.routineId = LocalStorage.getCurrentRoutine().id;

            Azure.TrainingSessionResource().save(session, function (savedSession) {

                LocalStorage.setTrainingSession(savedSession);
                that.updateTrainingStatus(true);
               
               // Notifier.done("Training session created", true);

            }, Notifier.errorHandler);
        },
        endTrainingSession: function (callback) {
            //update session end date and set current session to null, set routine details to null
            var that = this;
            var sessionId = LocalStorage.getTrainingSession().id;
            var results = {};
            var checker = {};
            var errorCount = 0;

            Notifier.busy();

            getWorkouts();
            getCardio();

            //Azure.invokeApi({
            //    api: "getworkoutsummary?sessionId=" + sessionId,
            //    //body: { sessionId: sessionId },
            //    success: function (results) {
            //        var jsonResult = JSON.parse(results.response);
            //        callback(jsonResult);
            //        that.updateTrainingStatus(false);

            //    }
            //});
            function done() {
                if (checker.weights && checker.sets && checker.exercises && checker.cardio) {
                    Notifier.done();
                    callback(results);
                }

                if (errorCount > 0) {
                    Notifier.done();
                }
            }

            function error(err) {
                console.log(err);
                errorCount++;
            }

            function getWorkouts() {

                Azure.table("workouts").read({
                    where: { trainingSessionId: sessionId },
                    success: function (wkts) {
                        checker.weights = true;
                        results.weights = wkts;
                        getSets(results.weights);
                        getExercises(results.weights);

                    },
                    error: error
                })
            }
            function getSets(wkts) {

                var numWkts = wkts.length;
                var counter = 0;
                
                if (!numWkts) {
                    checker.sets = true;
                    done();
                    return;
                }

                wkts.forEach(function (wkt) {

                    Azure.table("sets").read({
                    where: { workoutId: wkt.id },
                    success: function (sets) {

                        counter++;
                        wkt.sets = sets;

                        if (counter == numWkts) {
                            checker.sets = true;
                            done();
                        }

                    },
                    error: error
                })

                })
            }
            function getExercises(wkts) {

                var numWkts = wkts.length;
                var counter = 0;

                if (!numWkts) {
                    checker.exercises = true;
                    done();
                    return;
                }

                wkts.forEach(function (wkt) {

                    Azure.table("exercises").read({
                        where: { id: wkt.exerciseId },
                        success: function (exs) {

                            counter++;
                            wkt.exercise = exs[0];

                            if (counter == numWkts) {
                                checker.exercises = true;
                                done();
                            }

                        },
                        error: error
                    })

                })
            }

            function getCardio() {
                Azure.table("workouts_cardio").read({
                    where: { trainingSessionId: sessionId },
                    success: function (cardioList) {
                        checker.cardio = true;
                        results.cardio = cardioList;
                        done();

                    },
                    error: error
                })
            }
        },
        resetTrainingInfo: function (callback) {
            this.updateTrainingStatus(false, callback);

            LocalStorage.setCurrentClient(null);
            LocalStorage.setCurrentRoutine(null);
            LocalStorage.setCurrentWorkout(null);
            LocalStorage.setRoutineDetails(null);
            LocalStorage.setTrainingSession(null);
        },
        updateTrainingStatus: function (val, callback) {
            var that = this;

            var user = LocalStorage.getCurrentClient();
            var trainer = Identity.getLoggedInUser();

            if (user) {
            user.training = val;
            that.updateUser(user);

                    if (trainer && user.id == trainer.id) {
                        trainer.training = val;
                        Identity.setLoggedInUser(trainer);
                        
                        if (callback) {
                            callback();
                        }
                        return;
                    }
            }

            if (trainer) {
                trainer.training = val;
                that.updateUser(trainer, function (tr) {
                    Identity.setLoggedInUser(tr);                    
                    if (callback) {
                        callback();
                    }
                });
            }
       
         
        },
        updateUser: function (user, callback) {
            delete user.routine;
            delete user.rta;
            delete user.isUser;
            delete user.isTrainer;
            Azure.UserResource().update(user, function (user) {

                if (callback) {
                    callback(user);
                }

            }, Notifier.errorHandler); 
        }


    }

  });
