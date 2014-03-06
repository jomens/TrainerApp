var DigitalFio = DigitalFio || {};

(function () {
    DigitalFio.CardioWorkout = function () { //TODO: add cardio
        this.trainingSessionId = -1;
        this.userId = "";
        this.exerciseId = -1;
        this.exerciseName = "";
        this.workoutType = "cardio";

        this.mode = "";
        this.intensity = "";
        this.resistance = "";
        this.speed = "";
        this.reps = ""
        this.heartRate = "";
        this.duration = "";
        //this.startTime = new Date();;
        this.endTime = "";
        this.notes = "";
    }

})();