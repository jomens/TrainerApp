'use strict';

angular.module('TrainerApp')
.factory('Identity', function (Azure, Notifier, $location, LocalStorage, $rootScope) {

    //var activeUser;
    //this.accountInfo;
    //this._accountResource = Azure.AccountResource();

    //this.setActiveUser = function (user) {
    //    amplify.store("activeuser", user);
    //    activeUser = user;
    //}
    //this.getActiveUser = function () {
    //    if (!activeUser) {
    //        activeUser = amplify.store("activeuser");
    //    }
    //    return activeUser;

    //}
    //this.clearActiveUser = function () {
    //    this.setActiveUser(null);
    //    this.setAccountInfo(null);
    //}
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
        gotoUserPortal: function(){
            var user = LocalStorage.getLoggedInUser();

            switch (user.userType) {
                case "trainer":
                    $location.path("/trainer");
                    break;
                case "fitnesschainadmin":
                    $location.path("/fitnessChainPortal");
                    break;
                case "fitnesscenteradmin":
                    $location.path("/fitnessCenterPortal");
                    break;
                case "user":
                    $location.path("/userPortal");
                    break;
            }
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
                        LocalStorage.setLoggedInUser(userObject);
                        $rootScope.loggedInUser = userObject;

                        that.gotoUserPortal();
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
