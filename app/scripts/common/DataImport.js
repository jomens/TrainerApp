'use strict';

angular.module('TrainerApp')
.factory("DataImport", function () {


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

});

