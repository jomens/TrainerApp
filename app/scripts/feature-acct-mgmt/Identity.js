'use strict';

angular.module('TrainerApp')
.factory('Identity', function (Azure, Notifier, LocalStorage, $rootScope) {


    return {
        userLoggedIn: false,
        setPermissions: function (user) {
            switch (user.userType) {
                case "trainer":
                    user.isTrainer = true;
                    break;
                case "fitnesschainadmin":
                    user.isFitnessChainAdmin = true;
                    break;
                case "fitnesscenteradmin":
                    user.isFitnessCenterAdmin = true;
                    break;
                case "user":
                    user.isUser = true;
                    break;
            }
        },
        getLoggedInUser: function () {
            var user = LocalStorage.getLoggedInUser();

            if (user) {
                $rootScope.loggedInUser = user;
            }
            return user;
        },
        setLoggedInUser: function(user){
            this.setPermissions(user);
            LocalStorage.setLoggedInUser(user);
            $rootScope.loggedInUser = user;
        },
        //logout: function () {
        //    LocalStorage.setCurrentClient(null);
        //    LocalStorage.setCurrentRoutine(null);
        //    LocalStorage.setCurrentWorkout(null);
        //    LocalStorage.setRoutineDetails(null);
        //    LocalStorage.setTrainingSession(null);
        //    LocalStorage.setLoggedInUser(null);
        //    $rootScope.loggedInUser = null;
        //},
        //login: function (loginModel, callback) {
        //    var that = this;
        //    Azure.table("users").read({
        //        where: {
        //            email: loginModel.email,
        //            pin: loginModel.pin
        //        },
        //        success: function (results) {
        //            if (results && results[0]) {
        //                var userObject = results[0];

        //                that.setLoggedInUser(userObject);
                       
        //                callback();

        //            } else {
        //                Notifier.error("User  not found", true);
        //            }
        //        }
        //    });

        //},
        logout: function () {
            Azure.Client().logout();
        },
        login: function (authService, success, error) { //facebook, google etc
            //Azure.Client().login("microsoftaccount").then(function () {
            //Azure.Client().login("google").then(function () {
            //Azure.Client().login("twitter").then(function () {
            Azure.Client().login(authService).then(function () {
                
                success(Azure.Client().currentUser);

                console.log("getting more user data...");
                Azure.invokeApi({
                    api: "getuser", success: function (data) {
                        console.log(data);
                    }
                })
            }, error);
        }
    }

    ////PIN
    //this.updatePin = function (user, success) {
    //    if (user.pin != user.pinconfirm) {
    //        Notifier.error("PIN numbers do not match", true);
    //        return;
    //    }

    //    delete user.pinconfirm;
    //    Notifier.busy(true);

    //    var that = this;
    //    var usersTable = Azure.getTable("users");
    //    usersTable.update(user).done(function (data) {
    //        Notifier.done("pin updated");
    //        that.setActiveUser(data);
    //        success(data.id);
    //    }, Notifier.errorHandler)
    //}

    //this.validatePin = function (user) {
    //    if (user) {
    //        if (user.pin == "0000") {
    //            //force the user to setup a pin
    //            $location.path("/pin");
    //        }
    //    }
    //    else {
    //        //new user
    //        $location.path("/signup");
    //    }
    //}


});
