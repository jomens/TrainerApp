var DigitalFio = DigitalFio || {};

(function () {
    DigitalFio.Workout = function () { //each workout consists of an exercise and the sets/reps
        this.trainingSessionId = -1;
        this.exerciseId = -1;
        this.userId = "";
        this.exerciseName = "";
        this.sets = [];
        this.notes = "";
    }

})();