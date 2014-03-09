var DigitalFio = DigitalFio || {};

(function () {
    DigitalFio.UserType = {
        institutionAdmin: function () {
            return "institutionadmin";
        },
        isOrgAdmin: function (userType) {
            return userType == "institutionadmin";
        },
        siteAdmin: function () {
            return "siteadmin";
        },
        isSiteAdmin: function (userType) {
            return userType == "siteadmin";
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
        // institutionadmin: "Fitness Org Admin",
        //admin: "gymadmin"
    }

})();