'use strict';

angular.module('TrainerApp')
.factory("Models", ["Environment", function (Environment) {

    function getDummyData(obj) {
        var x = Math.floor((Math.random() * 50) + 1);
        for (var key in obj) {
            if (key == "id" || key == "status" || key == "pin" || key.toLowerCase().indexOf("usertype") != -1 || key.toLowerCase().indexOf("id") != -1) {
                continue;
            }
            else if (key.toLowerCase().indexOf("email") != -1) {
                obj[key] = "email" + x + "@email.com";
            }
            else if (key.toLowerCase().indexOf("state") != -1) {
                obj[key] = "WA";
            }
            else if (key.toLowerCase().indexOf("city") != -1) {
                obj[key] = "Seattle";
            }
            else if (key.toLowerCase().indexOf("zip") != -1) {
                obj[key] = "58585";
            }
            else if (key.toLowerCase().indexOf("phone") != -1) {
                obj[key] = "555555555";
            }
            else if (key.toLowerCase().indexOf("firstname") != -1) {
                obj[key] = "John" + x;
            }
            else if (key.toLowerCase().indexOf("lastname") != -1) {
                obj[key] = "Doe" + x;
            }
            else if (key.toLowerCase().indexOf("name") != -1) {
                obj[key] = "Company" + x;
            }
            else {
                obj[key] = "Lorem" + x;
            }

            //x++;
        }

        return obj;
    }

    var BodyParts = {
        chest: "Chest",
        abs: "Abs",
        shoulders: "Shoulders",
        biceps : "Biceps",
        triceps: "Triceps",
        back: "Back",
        legs: "Legs",
        core: "Core",
        arms: "Arms",
        cardio: "Cardio"
        };

    var Tags = {
        fw: "Free weights",
        fm: "Free motion",
        bb: "Bar bells",
        mc: "Machine",
        db: "Dumb bells",
        cb: "Cables",
        rb: "Resistance bands",
        cardio: "Cardio",
        warmup: "Warm up"
        };

    var AccountType = {
        business: "gym",
        trainer: "trainer",
        individual: "individual"
    };

    var Gym = function () {
        this.name = "";
        this.accountType = "";
        this.phone = "";
        this.email = "";
        this.mainContact = "";
        this.mainContactEmail = "";
        // this.addressId = "";
        //this.mainContactId = "";
    }

    //var Address = function () {
    //    this.address = "";
    //    this.address2 = "";
    //    this.city = "";
    //    this.state = "";
    //    this.zip = "";
    //    this.phone = "";
    //    this.accountId = "";

    //}

    var Client = function () {
        this.firstName = "";
        this.lastName = "";
        this.pin = "0000";
        this.email = "";
        this.phone = "";
        this.trainerId = -1;
    }

    var Trainer = function () {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
    }

    var TrainingSession = function () {
        this.date = "";
        this.userId = -1;
        this.trainerId = -1;
        this.workouts = [];
    }

    var Exercise = function () {
        this.name = "";
        this.bodyPart = ""; //shoulders, abs, etc
        this.category = ""; //cardio, free weights, cables, free-motion, body-weight,
    }

    var Set = function () {
        this.weight = 0.00;
        this.reps = -1;
    }

    var Workout = function () { //each workout consists of an exercise and the sets/reps
        ths.trainingSessionId = -1;
        this.exerciseId = -1;
        this.exerciseName = "";
        this.sets = [];
        this.notes = "";
    }

    //TRAINING PLANNING
    var Routine = function () {
        this.trainerId = -1;
        this.name = ""; //Chest and tris?
        this.exercises = [];
        this.expectedSets = 3;
    }

    //i meet Joe, on Monday, we're doing template X. 
    var TrainingPlan = function () {
        this.trainerId = -1;
        this.userId = -1;
        this.date = -1;
        this.routineId = -1;
    }








    function getModel(model) {

        if (Environment == "PROD") {
            switch (model) {
                case "trainer": return new Trainer();
                case "client": return new Client();
                case "gym": return new Gym();
                case "exercise": return new Exercise();
                case "routine": return new Routine();
                    // case "individual": return { firstName: "", lastName: "" };
            }

        }
        else {
            switch (model) {
                case "trainer": return getDummyData(new Trainer());
                case "client": return getDummyData(new Client());
                case "gym": return getDummyData(new Gym());
                case "exercise": return getDummyData(new Exercise());
                case "routine": return getDummyData(new Routine());
                    // case "punch": return new Punch();
                    //case "job": return getDummyData(new Job());
                    //  case "individual": return getDummyData({ firstName: "", lastName: "" });

            }
        }
    }

    return {
        Trainer: function () { return getModel("trainer"); },
        User: function () { return getModel("client"); },
        Routine: function () { return getModel("routine"); },
        Tags: function(){ return Tags; },
        BodyParts: function () { return BodyParts; },
        //AccountType: AccountType,
        //Individual: function () { return getModel("individual"); },

    }

}])

