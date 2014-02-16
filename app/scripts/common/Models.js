'use strict';

angular.module('TrainerApp')
.factory("Models", ["Environment", function (Environment) {

    function getImage() {

            var baseUrl = "http://api.randomuser.me/0.2/portraits/";
            var gender = ["men", "women"];

            return baseUrl + gender[Math.floor(Math.random() * 2)] + "/" + Math.ceil(Math.random() * 20) + ".jpg";
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
        this.name = ""; //24 HR Fitness? John Doe independent trainer
        this.accountType = ""; //business, trainer, individual
        
    }

    var FitnessChain = function () { //TODO RENAME TO FITNESS ORG
        this.name = "";
        this.email = "";
        this.addressId = "";        
    }

    var FitnessCenter = function () {
        this.fitnessChainId = "";
        this.name = "";
        this.location = "";
        this.addressId = "";
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
        this.auth_userId = "";
        this.firstName = "";
        this.lastName = "";
        this.auth_userId = "";
        this.email = "";
        this.phone = "";
        this.userType = ""
        this.trainerId = "";
        this.fitnessCenterId = "";
        this.fitnessOrgId = "";
        this.fitnessChainId = "-1";
        this.isAdmin = false;
        this.isRemote = false;
        this.imageUrl = "";

        //added
    }
    
    var TrainingSession = function () {
        this.date = "";
        this.userId = -1;
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
        this.userId = "";
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

    //TRAINING PLANNING
    var Routine = function () {
        this.createdBy = "";
        this.name = ""; //Chest and tris?
         this.descriptions = "";
      // this.exercises = [];
        this.expectedSets = 3;
    }

    //ROUTINE ASSIGNMENTS
    //routineId & assignedTo (user), assignedBy, assignmentDate? routineCompleted?

    var RoutineAssignment = function () {
        this.routineId = "";
        this.assignedTo = "";
        this.assignedBy = "";
        this.date = "";
        this.completed = false;
    }

    //i meet Joe, on Monday, we're doing template X. 
    var TrainingPlan = function () {
        this.trainerId = -1;
        this.userId = -1;
        this.date = -1;
        this.routineId = -1;
    }

    return {
        User: function () { return new User(); },
        Trainer: function () {
            var trainer = new User();
            trainer.userType = 'trainer';
            return trainer;
        },
        Routine: function () { return new Routine(); },
        FitnessChain: function () { return new FitnessChain(); },
        FitnessCenter: function () { return new FitnessCenter(); },
        Tags: function () { return Tags; },
        BodyParts: function () { return BodyParts; },
        CardioModes: function () { return CardioModes; },
        TrainingSession: function () { return new TrainingSession(); },
        Workout: function () { return new Workout(); },
        CardioWorkout: function () { return new CardioWorkout(); },
        Set: function () { return new Set(); },
        UserType: function () { return UserType; },
        RoutineAssignment: function () { return new RoutineAssignment();}

    }

}])

