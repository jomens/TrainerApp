'use strict';

angular.module('TrainerApp')
.factory('Identity', function (Azure, Notifier, LocalStorage, $rootScope) {

    //var activeUser;
    //this.accountInfo;
    //this._accountResource = Azure.AccountResource();

 
    //this.isAdministrator = function () {
    //    return this.getActiveUser() && this.getActiveUser().userType == "admin";
    //}

    ////account info
    //this.getAccountInfo = function () {
    //    return this.accountInfo || amplify.store("account");
    //}

    //this.setAccountInfo = function (account) {
    //    if (account) {
    //        delete account.admin;
    //    }
    //    amplify.store("account", account);
    //    this.accountInfo = account;
    //}

    //this.isBusinessAccount = function () {
    //    return this.getAccountInfo().accountType == "business";
    //}

    //this.fetchAccountInfo = function (accountId) {
    //    var that = this;
    //    this._accountResource.get({ id: accountId }, function (data) {
    //        that.setAccountInfo(data);
    //    }, function () {
    //        Notifier.error("unable to account info");
    //    });
    //}

    //Login logout

    return {
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
        logout: function () {
            LocalStorage.setCurrentClient(null);
            LocalStorage.setCurrentRoutine(null);
            LocalStorage.setCurrentWorkout(null);
            LocalStorage.setRoutineDetails(null);
            LocalStorage.setTrainingSession(null);
            LocalStorage.setLoggedInUser(null);
            $rootScope.loggedInUser = null;
        },
        login: function (loginModel, callback) {
            var that = this;
            Azure.table("users").read({
                where: {
                    email: loginModel.email,
                    pin: loginModel.pin
                },
                success: function (results) {
                    if (results && results[0]) {
                        var userObject = results[0];

                        Notifier.done("logged in");
                        that.setPermissions(userObject);
                        LocalStorage.setLoggedInUser(userObject);
                        $rootScope.loggedInUser = userObject;
                       
                        callback();

                    } else {
                        Notifier.error("User  not found", true);
                    }
                }
            });

        },
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
