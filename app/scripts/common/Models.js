'use strict';

angular.module('TrainerApp')
.factory("Models", ["Environment", function (Environment) {
   

    return {
        User: function () { return new DigitalFio.User(); },
        Trainer: function () {
            var trainer = new DigitalFio.User();
            trainer.userType = DigitalFio.UserType.trainer();
            return trainer;
        },
        InstitutionAdmin: function () {
            var admin = new DigitalFio.User();
            admin.userType = DigitalFio.UserType.institutionAdmin();
            return admin;
        },
        SiteAdmin: function () {
            var admin = new DigitalFio.User();
            admin.userType = DigitalFio.UserType.siteAdmin();
            return admin;
        },
        Role: function () { return new DigitalFio.Role(); },
        Exercise: function () { return new DigitalFio.Exercise(); },
        Routine: function () { return new DigitalFio.Routine(); },
        RoutineActivity: function () { return new DigitalFio.RoutineActivity(); },
        WorkoutTarget: function () { return new DigitalFio.WorkoutTarget(); },
        TargetWeight: function () { return new DigitalFio.TargetWeight(); },
        Institution: function () { return new DigitalFio.Institution(); },
        Site: function () { return new DigitalFio.Site(); },
        Tags: function () { return DigitalFio.Tags; },
        BodyParts: function () { return DigitalFio.BodyParts; },
        MuscleGroups: function () { return DigitalFio.MuscleGroups; },
        ExerciseCategory: function () { return DigitalFio.ExerciseCategory; },
        CardioModes: function () { return DigitalFio.CardioModes; },
        TrainingSession: function () { return new DigitalFio.TrainingSession(); },
        Workout: function () { return new DigitalFio.Workout(); },
        CardioWorkout: function () { return new DigitalFio.CardioWorkout(); },
        Set: function () { return new DigitalFio.Set(); },
        UserType: function () { return DigitalFio.UserType; },
        RoutineAssignment: function () { return new DigitalFio.RoutineAssignment(); }

    }

}])

