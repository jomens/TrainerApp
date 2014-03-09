'use strict';

angular.module('TrainerApp')
.factory("DataImport", function () {

    var MuscleGroups = [
      { title: "Chest", name: "chest" },
      { title: "Abs", name: "abs" },
      { title: "Shoulders", name: "shoulders" },
      { title: "Biceps", name: "biceps" },
      { title: "Triceps", name: "triceps" },
      { title: "Back", name: "back" },
      { title: "Legs", name: "legs" },
      { title: "Arms", name: "arms" },
      { title: "Cardio", name: "cardio" },
      { title: "Core", name: "core" },
    ];

    var ExerciseCategory = [
        { name: "Free weights", tag: "fw" },
        { name: "Free motion", tag: "fm" },
        { name: "Bar bells", tag: "bb" },
        { name: "Machine", tag: "bc" },
        { name: "Dumb bells", tag: "db" },
        { name: "Cables", tag: "cb" },
        { name: "Resistance bands", tag: "rb" },
        { name: "Cardio", tag: "cardio" },
        { name: "Warm up", tag: "warmup" },
    ];

    var Exercises = [
        {
            muscleGroup: "Chest",
            exercises: ["Flat bar bell bench press",
                        "Flat dumb bell bench press",
                        "Incline bar bell bench press",
                        "Incline dumb bell bench press",
                        "Decline bar bell bench press",
                        "Decline dumb bell bench press",
                        "Flat machine chest press",
                        "Dumb bell flyes",
                        "Dumb bell pull overs",
                        "Incline machine chest press",
                        "Decline machine chest press",
                        "Pushups",
                        "Cable press",
                        "Cable flyes"
            ]
        },
        {
            muscleGroup: "Abs",
            exercises: [
                        "Sit ups",
                        "Decline sit ups",
                        "Straight leg raises",
                        "Knee raises",
                        "Weighted sit ups",
                        "Cable crunches",
                        "Resistance band sit ups",
                        "Planks"
            ]
        },
        {
            muscleGroup: "Shoulders",
            exercises: ["Bar bell shoulder press",
                        "Dumb bell shoulder press",
                        "Dumb bell flyes",
                        "Front dumb bell raises",
                        "Front hammer dumb bell raises",
                        "Rear delt flyes",
                        "Cable rear delt flyes",
                        "Machine shoulder presses",
                        "Resistance band shoulder press",
                        "Dumb bell shrugs",
                        "Bar bell shrugs",
                        "Cable shrugs"
            ]
        },
        {
            muscleGroup: "Back",
            exercises: [
                "Pull ups",
               "Lat pull downs",
               "Reverse lat pull downs",
               "Wide lat seated rows",
               "Close grip seated rows",
               "Dumb bell rows",
               "Bar bell rows",
               "Bar bell upright rows",
               "Dumb bell upright rows",
                "Machine seated rows",
                "Machine seated reverse rows",
                "Bar bell dead lifts",
                "Dumb bell dead lifts"
            ]
        },
        {
            muscleGroup: "Biceps",
            exercises: ["Standing Dumb bell curls",
                "Standing Bar bell curls",
                "Seated dumb bell curls",
                "Preacher bar curls",
                "Dumb bell preacher curls",
                "Standing dumb bell hammer curls",
                "Cable curls",
                "Reverse preacher curls",
                "Resistance band curls"
            ]
        },
        {
            muscleGroup: "Triceps",
            exercises: [
                 "Straight bar cable press downs",
                "Tricep extensions",
                "Skull crushers",
                "Bent over dumb bell kickbacks",
                "V-bar cable press downs",
                "Reverse cable press downs",
                "Dips",
                 "Seated dips",
                "Seated dips machine",
                "Resistance band tricep extensions",
            ]
        },
        {
            muscleGroup: "Legs",
            exercises: [
                "Leg press (bar bells)",
                "Leg press (machine)",
                "Leg extensions",
                "Leg curls",
                "Bar bell squats",
                "Dumb bell squats",
                "Adductors",
                "Abductors",
                "Dumb bell lunges",
                "Bar bell lunges"
            ]
        },
        {
            muscleGroup: "Calfs",
            exercises: [
             "Bar bell calf raises",
             "Smith machine calf raises",
             "Seated calf raises"
            ]
        },
        {
            muscleGroup: "Cardio",
            exercises: [
                 "Treadmill",
                  "Stair master",
                  "stair stepper",
                  "Spin cycling",
                  "Seated cycling",
                  "Running",
                  "Walking",
                  "Jump ropes"
            ]
        },
    ]

    var Roles = [
        { title: "Institution Admin", code: "instadmin", description: "Has permissions to add fitness sites, locations, add users, delete users, lock accounts" },
        { title: "Site Admin", code: "siteadmin", description: "Has permissions to setup personal trainers, add users, delete users, lock accounts" },
        { title: "Personal Trainer", code: "trainer", description: "Has permissions to setup users, create routines, etc" },
        { title: "Athletics Admin", code: "athleteadmin", description: "Has permissions create teams, groups, etc" },
        { title: "Coach", code: "coach", description: "Has permissions add team members, setup users, create training routines, etc" },
        //{ title: "", code: "", description: "" },
        //{ title: "", code: "", description: "" },
        //{ title: "", code: "", description: "" },
        //{ title: "", code: "", description: "" },
    ]
    return {
        Exercises: Exercises,
        Roles: Roles,
    }

});

