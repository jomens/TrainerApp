var DigitalFio = DigitalFio || {};

(function () {
    DigitalFio.UserType = {
        fitnessOrgAdmin: function () {
            return "fitnessorgadmin";
        },
        isOrgAdmin: function (userType) {
            return userType == "fitnessorgadmin";
        },
        fitnessCenterAdmin: function () {
            return "fitnesscenteradmin";
        },
        isFitnessCenterAdmin: function (userType) {
            return userType == "fitnesscenteradmin";
        },
        trainer: function () {
            return "trainer";
        },
        isTrainer: function (userType) {
            return userType == "trainer";
        },
        user: function () {
            return "user";
        },
        isUser: function (userType) {
            return userType == "user" || userType == "";
        },
        // fitnessorgadmin: "Fitness Org Admin",
        //admin: "gymadmin"
    }

})();