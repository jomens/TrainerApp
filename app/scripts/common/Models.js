'use strict';

angular.module('TrainerApp')
.factory("Models", ["Environment", function (Environment) {

    function getDummyData(obj) {
        var x = Math.floor((Math.random() * 50) + 1);
        for (var key in obj) {
            if (key == "id" || key == "status" || key == "pin" || key == "isAdmin" || key.toLowerCase().indexOf("usertype") != -1 || key.toLowerCase().indexOf("id") != -1) {
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
            else if (key.toLowerCase().indexOf("imageurl") != -1) {
                obj[key] = getImage();
            }
            else {
                obj[key] = "Lorem" + x;
            }

            //x++;
        }

        function getImage () {

            var baseUrl = "http://api.randomuser.me/0.2/portraits/";
            var gender = ["men", "women"];

            return baseUrl + gender[Math.floor(Math.random() * 2)] + "/" + Math.ceil(Math.random() * 20) + ".jpg";
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
    
    var Account = function () { //you get an account only if you're independent
        //id
        this.name = ""; //24 HR Fitness? John Doe independent trainer
        this.accountType = ""; //business, trainer, individual
        
    }

    var FitnessChain = function () {
        //this.id
        this.name = "";
        this.email = "";
        this.addressId = "";        
        //this.gyms = [];
    }

    var FitnessCenter = function () {
        //this.id
        this.fitnessChainId = "";
        this.name = "";
        this.location = "";
        this.addressId = "";
        //this.users = []; //trainers and users
    }

    var AccountType = {
        //business: "Fitness Center",
        trainer: "Personal Trainer",
        individual: "Individual"
    };

    var UserType = { //a user can be trainer, a client or gymadmin
        trainer: "Personal Trainer",
        user: "A regular user",
       // fitnesschainadmin: "Fitness Chain Admin",
        //admin: "gymadmin"
    }

    //var Gym = function () {
    //    this.name = "";
    //    this.accountType = "";
    //    this.phone = "";
    //    this.email = "";
    //    this.mainContact = "";
    //    this.mainContactEmail = "";
    //    // this.addressId = "";
    //    //this.mainContactId = "";
    //}

    //var Address = function () {
    //    this.address = "";
    //    this.address2 = "";
    //    this.city = "";
    //    this.state = "";
    //    this.zip = "";
    //    this.phone = "";
    //}

    //should this be users? will have associated accountID's, trainerId?, usertype? trainer?
    var User = function () { //this holds both trainers and users...but will have a
        this.firstName = "";
        this.lastName = "";
        this.pin = "0000";
        this.email = "";
        this.phone = "";
        this.userType = ""
        this.trainerId = "-1";
        this.fitnessCenterId = "-1";
        this.fitnessChainId = "-1";
        this.isAdmin = false;
        this.imageUrl = "";

        //added
    }
    
    var TrainingSession = function () {
        this.date = "";
        this.clientId = -1;
        this.trainerId = -1;
        this.routineId = -1;
        //this.workouts = [];
    }

    var Exercise = function () {
        this.name = "";
        this.bodyPart = ""; //shoulders, abs, etc
        this.category = ""; //cardio, free weights, cables, free-motion, body-weight,
    }

    var Set = function () {
        //workoutId
        this.weight = 0.00;
        this.reps = -1;
    }

    var Workout = function () { //each workout consists of an exercise and the sets/reps
        this.trainingSessionId = -1;
        this.exerciseId = -1;
        this.exerciseName = "";
        this.sets = [];
        this.notes = "";
    }

    var CardioModes = {
        aerobic: "Aerobic",
        fatburner: "Fat Burner",
        interval: "Interval",
        manual: "Manual"
    };

    var CardioWorkout = function () { //TODO: add cardio
        this.trainingSessionId = -1;
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
                case "user": return new User();
                case "fitnesscenter": return new FitnessCenter();
                case "exercise": return new Exercise();
                case "routine": return new Routine();
                case "fitnesschain": return new FitnessChain();
                case "gym": return new Gym();
                    // case "individual": return { firstName: "", lastName: "" };
            }

        }
        else {
            switch (model) {
                case "user": return getDummyData(new User());
                case "fitnesscenter": return getDummyData(new FitnessCenter());
                case "exercise": return getDummyData(new Exercise());
                case "routine": return getDummyData(new Routine());
                case "fitnesschain": return getDummyData(new FitnessChain());
                case "gym": return getDummyData(new Gym());
                    // case "punch": return new Punch();
                    //case "job": return getDummyData(new Job());
                    //  case "individual": return getDummyData({ firstName: "", lastName: "" });

            }
        }
    }

    return {
        User: function () { return getModel("user"); },
        Routine: function () { return getModel("routine"); },
        FitnessChain: function () { return getModel("fitnesschain"); },
        FitnessCenter: function () { return getModel("fitnesscenter"); },
        Tags: function () { return Tags; },
        BodyParts: function () { return BodyParts; },
        CardioModes: function () { return CardioModes; },
        TrainingSession: function () { return new TrainingSession(); },
        Workout: function () { return new Workout(); },
        CardioWorkout: function () { return new CardioWorkout(); },
        Set: function () { return new Set(); },
        UserType: function () { return UserType; },
        //Individual: function () { return getModel("individual"); },

    }

}])

