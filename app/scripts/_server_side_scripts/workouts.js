function read(query, user, request) {

    var setsTable = tables.getTable("sets");
    var exercisesTable = tables.getTable("exercises");

    request.execute({
        success: function (workouts) {
            var numWorkouts = workouts.length;
            var counter = 0;
            //grab the sets for each workout
            workouts.forEach(function (wkt) {
                setsTable.where({ workoutId: wkt.id }).read({
                    success: function (sets) {
                        wkt.sets = sets;

                        counter++;

                        if (counter == numWorkouts) {
                            request.respond();
                        }
                    }
                });
            });
        }
    });

}

function insert(item, user, request) {

    var sets = item.sets;
    delete item.sets;
    delete item.exerciseName;

    var setsTable = tables.getTable("sets");

    request.execute({
        success: function () {
            var workoutId = item.id;
            var numSets = sets.length;

            var counter = 0;
            //save the sets
            sets.forEach(function (set) {
                set.workoutId = workoutId;

                setsTable.insert(set, {
                    success: function (savedSet) {
                        counter++;

                        if (counter === numSets) {
                            request.respond();
                        }
                    },
                    error: function () {
                        request.respond(statusCodes.BAD_REQUEST, "Unable to save sets");
                    }
                })
            });

        },
        error: function () {
            request.respond(statusCodes.BAD_REQUEST, "Unable to save workout");
        }
    });

}


//training session read
function read(query, user, request) {

    var setsTable = tables.getTable("sets");
    var exercisesTable = tables.getTable("exercises");

    request.execute({
        success: function (workouts) {
            var numWorkouts = workouts.length;
            var counter = 0;
            //grab the sets for each workout
            workouts.forEach(function (wkt) {
                setsTable.where({ workoutId: wkt.id }).read({
                    success: function (sets) {
                        wkt.sets = sets;

                        counter++;

                        if (counter == numWorkouts) {
                            request.respond();
                        }
                    }
                });
            });
        }
    });

}