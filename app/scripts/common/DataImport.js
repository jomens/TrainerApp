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

    var listOfExercises = [
        { bodyPart: "Warmup", tags: "warmup", name: "Quick warm up" },

        { bodyPart: "Chest", tags: "fw, bb", name: "Flat bar bell bench press" },
        { bodyPart: "Chest", tags: "fw, db", name: "Flat dumb bell bench press" },
        { bodyPart: "Chest", tags: "fw, bb", name: "Incline bar bell bench press" },
        { bodyPart: "Chest", tags: "fw, db", name: "Incline dumb bell bench press" },
        { bodyPart: "Chest", tags: "fw, bb", name: "Decline bar bell bench press" },
        { bodyPart: "Chest", tags: "fw, db", name: "Decline dumb bell bench press" },
        { bodyPart: "Chest", tags: "mc", name: "Flat machine chest press" },
        { bodyPart: "Chest", tags: "fw, db", name: "Dumb bell flyes" },
        { bodyPart: "Chest", tags: "fw, db", name: "Dumb bell pull overs" },
        { bodyPart: "Chest", tags: "mc", name: "Incline machine chest press" },
        { bodyPart: "Chest", tags: "mc", name: "Decline machine chest press" },
        { bodyPart: "Chest", tags: "fm", name: "Pushups" },
        { bodyPart: "Chest", tags: "cb", name: "Cable press" },
        { bodyPart: "Chest", tags: "cb", name: "Cable flyes" },

        { bodyPart: "Abs", tags: "fm", name: "Sit ups" },
        { bodyPart: "Abs", tags: "fm", name: "Decline sit ups" },
        { bodyPart: "Abs", tags: "fm", name: "Straight leg raises" },
        { bodyPart: "Abs", tags: "fm", name: "Knee raises" },
        { bodyPart: "Abs", tags: "fm", name: "Weighted sit ups" },
        { bodyPart: "Abs", tags: "cb", name: "Cable crunches" },
        { bodyPart: "Abs", tags: "rb", name: "Resistance band sit ups" },
        { bodyPart: "Abs, Core", tags: "fm", name: "Planks" },

        { bodyPart: "Shoulders", tags: "fw, bb", name: "Bar bell shoulder press" },
        { bodyPart: "Shoulders", tags: "fw, db", name: "Dumb bell shoulder press" },
        { bodyPart: "Shoulders", tags: "fw, db", name: "Dumb bell flyes" },
        { bodyPart: "Shoulders", tags: "fw, db", name: "Front dumb bell raises" },
        { bodyPart: "Shoulders", tags: "fw, db", name: "Front hammer dumb bell raises" },
        { bodyPart: "Shoulders", tags: "fw", name: "Rear delt flyes" },
        { bodyPart: "Shoulders", tags: "cb", name: "Cable rear delt flyes" },
        { bodyPart: "Shoulders", tags: "mc", name: "Machine shoulder presses" },
        { bodyPart: "Shoulders", tags: "rb", name: "Resistance band shoulder press" },
        { bodyPart: "Shoulders, Back", tags: "fw, db", name: "Dumb bell shrugs" },
        { bodyPart: "Shoulders, Back", tags: "fw, bb", name: "Bar bell shrugs" },
        { bodyPart: "Shoulders, Back", tags: "fw, cb", name: "Cable shrugs" },

        { bodyPart: "Back", tags: "fm", name: "Pull ups" },
        { bodyPart: "Back", tags: "fw, cb", name: "Lat pull downs" },
        { bodyPart: "Back", tags: "fw, cb", name: "Reverse lat pull downs" },
        { bodyPart: "Back", tags: "fw, cb", name: "Wide lat seated rows" },
        { bodyPart: "Back", tags: "fw, cb", name: "Close grip seated rows" },
        { bodyPart: "Back", tags: "fw, db", name: "Dumb bell rows" },
        { bodyPart: "Back", tags: "fw, bb", name: "Bar bell rows" },
        { bodyPart: "Back", tags: "fw, bb", name: "Bar bell upright rows" },
        { bodyPart: "Back", tags: "fw, db", name: "Dumb bell upright rows" },
        { bodyPart: "Back", tags: "mc", name: "Machine seated rows" },
        { bodyPart: "Back", tags: "mc", name: "Machine seated reverse rows" },
        { bodyPart: "Back", tags: "fw, bb", name: "Bar bell dead lifts" },
        { bodyPart: "Back", tags: "fw, db", name: "Dumb bell dead lifts" },

        { bodyPart: "Arms, Biceps", tags: "fw, db", name: "Standing Dumb bell curls" },
        { bodyPart: "Arms, Biceps", tags: "fw, bb", name: "Standing Bar bell curls" },
        { bodyPart: "Arms, Biceps", tags: "fw, db", name: "Seated dumb bell curls" },
        { bodyPart: "Arms, Biceps", tags: "fw, bb", name: "Preacher bar curls" },
        { bodyPart: "Arms, Biceps", tags: "fw, db", name: "Dumb bell preacher curls" },
        { bodyPart: "Arms, Biceps", tags: "fw, db", name: "Standing dumb bell hammer curls" },
        { bodyPart: "Arms, Biceps", tags: "cb", name: "Cable curls" },
        { bodyPart: "Arms, Biceps", tags: "fw, bb", name: "Reverse preacher curls" },
        { bodyPart: "Arms, Biceps", tags: "rb", name: "Resistance band curls" },

        { bodyPart: "Arms, Triceps", tags: "cb", name: "Straight bar cable press downs" },
        { bodyPart: "Arms, Triceps", tags: "cb", name: "Tricep extensions" },
        { bodyPart: "Arms, Triceps", tags: "fw, bb", name: "Skull crushers" },
        { bodyPart: "Arms, Triceps", tags: "fw, db", name: "Bent over dumb bell kickbacks" },
        { bodyPart: "Arms, Triceps", tags: "cb", name: "V-bar cable press downs" },
        { bodyPart: "Arms, Triceps", tags: "cb", name: "Reverse cable press downs" },
        { bodyPart: "Arms, Triceps", tags: "fm", name: "Dips" },
        { bodyPart: "Arms, Triceps", tags: "fm, fw", name: "Seated dips" },
        { bodyPart: "Arms, Triceps", tags: "mc", name: "Seated dips machine" },
        { bodyPart: "Arms, Triceps", tags: "rb", name: "Resistance band tricep extensions" },

        { bodyPart: "Legs", tags: "fw", name: "Leg press (bar bells)" },
        { bodyPart: "Legs", tags: "fw, mc", name: "Leg press (machine)" },
        { bodyPart: "Legs", tags: "fw, mc", name: "Leg extensions" },
        { bodyPart: "Legs", tags: "fw, mc", name: "Leg curls" },
        { bodyPart: "Legs", tags: "fw, bb", name: "Bar bell squats" },
        { bodyPart: "Legs", tags: "fw, db", name: "Dumb bell squats" },
        { bodyPart: "Legs", tags: "fw, mc", name: "Adductors" },
        { bodyPart: "Legs", tags: "fw, mc", name: "Abductors" },
        { bodyPart: "Legs", tags: "fw, db", name: "Dumb bell lunges" },
        { bodyPart: "Legs", tags: "fw, bb", name: "Bar bell lunges" },

        { bodyPart: "Legs, Calfs", tags: "fw, bb", name: "Bar bell calf raises" },
        { bodyPart: "Legs, Calfs", tags: "fw, bb", name: "Smith machine calf raises" },
        { bodyPart: "Legs, Calfs", tags: "fw, mc", name: "Seated calf raises" },

        { bodyPart: "Cardio", tags: "cardio", name: "Treadmill" },
        { bodyPart: "Cardio", tags: "cardio", name: "Stair master" },
        { bodyPart: "Cardio", tags: "cardio", name: "stair stepper" },
        { bodyPart: "Cardio", tags: "cardio", name: "Spin cycling" },
        { bodyPart: "Cardio", tags: "cardio", name: "Seated cycling" },
        { bodyPart: "Cardio", tags: "cardio", name: "Running" },
        { bodyPart: "Cardio", tags: "cardio", name: "Walking" },
        { bodyPart: "Cardio", tags: "cardio", name: "Jump ropes" },
        //{ bodyPart: "Cardio", tags: "cardio", name: "" },
        //{ bodyPart: "", tags: "", name: "" },

    ]

    var trainingTemplates = [
        {
            trainerId: "all", name: "TeplateName", expectedSets: 3,
            exercises: []
        }
    ]
    return {
        Exercises: listOfExercises,
    }

})
.factory("NewExerciseData", function () {
    /*var MuscleGroups = {
        chest: "Chest",
        abs: "Abs",
        shoulders: "Shoulders",
        biceps: "Biceps",
        triceps: "Triceps",
        back: "Back",
        legs: "Legs",
        core: "Core",
        cardio: "Cardio"
    };

    var ExerciseCategories = {
        fm: "Free motion",
        bb: "Bar bells",
        mc: "Machine",
        db: "Dumb bells",
        cb: "Cables",
        rb: "Resistance bands",
        cardio: "Cardio",
        warmup: "Warm up",
        stretching: "Stretching"
    };

    var listOfExercises = [
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.bb, name: "Flat bar bell bench press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.db, name: "Flat dumb bell bench press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.bb, name: "Incline bar bell bench press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.db, name: "Incline dumb bell bench press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.bb, name: "Decline bar bell bench press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.db, name: "Decline dumb bell bench press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.mc, name: "Flat machine chest press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.db, name: "Dumb bell flyes" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.db, name: "Dumb bell pull overs" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.mc, name: "Incline machine chest press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.mc, name: "Decline machine chest press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.fm, name: "Pushups" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.cb, name: "Cable press" },
    { muscleGroup: MuscleGroups.chest, exerciseCategory: ExerciseCategories.cb, name: "Cable flyes" },

    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.fm, name: "Sit ups" },
    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.fm, name: "Decline sit ups" },
    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.fm, name: "Straight leg raises" },
    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.fm, name: "Knee raises" },
    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.fm, name: "Weighted sit ups" },
    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.cb, name: "Cable crunches" },
    { muscleGroup: MuscleGroups.abs, exerciseCategory: ExerciseCategories.rb, name: "Resistance band sit ups" },
    { muscleGroup: MuscleGroups.core, exerciseCategory: ExerciseCategories.fm, name: "Planks" },

    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.bb, name: "Bar bell shoulder press" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.db, name: "Dumb bell shoulder press" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.db, name: "Dumb bell flyes" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.db, name: "Front dumb bell raises" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.db, name: "Front hammer dumb bell raises" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: "fw", name: "Rear delt flyes" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.cb, name: "Cable rear delt flyes" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.mc, name: "Machine shoulder presses" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.rb, name: "Resistance band shoulder press" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.db, name: "Dumb bell shrugs" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.bb, name: "Bar bell shrugs" },
    { muscleGroup: MuscleGroups.shoulders, exerciseCategory: ExerciseCategories.cb, name: "Cable shrugs" },

    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.fm, name: "Pull ups" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.cb, name: "Lat pull downs" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.cb, name: "Reverse lat pull downs" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.cb, name: "Wide lat seated rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.cb, name: "Close grip seated rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.db, name: "Dumb bell rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.bb, name: "Bar bell rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.bb, name: "Bar bell upright rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.db, name: "Dumb bell upright rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.mc, name: "Machine seated rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.mc, name: "Machine seated reverse rows" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.bb, name: "Bar bell dead lifts" },
    { muscleGroup: MuscleGroups.back, exerciseCategory: ExerciseCategories.db, name: "Dumb bell dead lifts" },

    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.db, name: "Standing Dumb bell curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.bb, name: "Standing Bar bell curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.db, name: "Seated dumb bell curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.bb, name: "Preacher bar curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.db, name: "Dumb bell preacher curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.db, name: "Standing dumb bell hammer curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.cb, name: "Cable curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.bb, name: "Reverse preacher curls" },
    { muscleGroup: MuscleGroups.biceps, exerciseCategory: ExerciseCategories.rb, name: "Resistance band curls" },

    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.cb, name: "Straight bar cable press downs" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.cb, name: "Tricep extensions" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.bb, name: "Skull crushers" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.db, name: "Bent over dumb bell kickbacks" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.cb, name: "V-bar cable press downs" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.cb, name: "Reverse cable press downs" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.fm, name: "Dips" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.fm, name: "Seated dips" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.mc, name: "Seated dips machine" },
    { muscleGroup: MuscleGroups.triceps, exerciseCategory: ExerciseCategories.rb, name: "Resistance band tricep extensions" },

    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.bb, name: "Leg press (bar bells)" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.mc, name: "Leg press (machine)" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.mc, name: "Leg extensions" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.mc, name: "Leg curls" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.bb, name: "Bar bell squats" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.db, name: "Dumb bell squats" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.mc, name: "Adductors" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.mc, name: "Abductors" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.db, name: "Dumb bell lunges" },
    { muscleGroup: MuscleGroups.legs, exerciseCategory: ExerciseCategories.bb, name: "Bar bell lunges" },

    { muscleGroup: MuscleGroups.calfs, exerciseCategory: ExerciseCategories.bb, name: "Bar bell calf raises" },
    { muscleGroup: MuscleGroups.calfs, exerciseCategory: ExerciseCategories.bb, name: "Smith machine calf raises" },
    { muscleGroup: MuscleGroups.calfs, exerciseCategory: ExerciseCategories.mc, name: "Seated calf raises" },

    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Treadmill" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Stair master" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Stair stepper" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Spin cycling" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Seated cycling" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Running" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Walking" },
    { muscleGroup: ExerciseCategories.cardio, exerciseCategory: ExerciseCategories.cardio, name: "Jump ropes" },
    //{ muscleGroup: ExerciseCategories.cardio, tags: ExerciseCategories.cardio, name: "" },
    //{ muscleGroup: "", tags: "", name: "" },

    ]*/

});

