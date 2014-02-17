'use strict';

angular.module('TrainerApp')
.factory('Identity', function (Azure, Notifier, LocalStorage, $rootScope) {


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

            if ($rootScope.loggedInUser) {
                return $rootScope.loggedInUser;
            }

            //var user = LocalStorage.getLoggedInUser();
            var user = LocalStorage.loggedInUser().get();

            if (user) {
                $rootScope.loggedInUser = user;
            }
            return user;
        },
        setLoggedInUser: function(user){
            this.setPermissions(user);
            //LocalStorage.setLoggedInUser(user);
            LocalStorage.loggedInUser().set(user);
            $rootScope.loggedInUser = user;
        },
        logout: function () {
            Azure.Client().logout();
            LocalStorage.setCurrentClient(null);
            LocalStorage.setCurrentRoutine(null);
            LocalStorage.setCurrentWorkout(null);
            LocalStorage.setRoutineDetails(null);
            LocalStorage.setTrainingSession(null);
            LocalStorage.setLoggedInUser(null);
            $rootScope.loggedInUser = null;
        },
  
        login: function (authService, success, error) { 

                var that = this;

                Azure.Client().login(authService).then(function () {
                    Azure.table("users").read({
                        where: {
                            auth_userId: Azure.Client().currentUser.userId
                        },
                        success: function (results) {
                            
                            if (results && results[0]) {
                                var userObject = results[0];
                                console.log("user found");

                                that.setLoggedInUser(userObject);

                                success(Azure.Client().currentUser);

                            } else {
                                Notifier.error("User  not found", true);
                                error();
                            }
                        },
                        error: error
                    });
                

            }, Notifier.error);
        },
        getAuthServiceData: function (success) {
            Azure.invokeApi({
                api: "getuser", success: function (data) {
                    success(parseUserObject(data.result.myresult));
                },
                error: error
            });

            function parseUserObject(obj) {
                if (obj.google) {
                    return {
                        auth_userId: obj.google.userId,
                        firstName: obj.google.given_name,
                        lastName: obj.google.family_name,
                        gender: ""
                    }
                }

                if (obj.facebook) {
                    return {
                        auth_userId: obj.facebook.userId,
                        firstName: obj.facebook.first_name,
                        lastName: obj.facebook.last_name,
                        gender: ""
                    }
                }

                if (obj.microsoft) {
                    return {
                        auth_userId: obj.microsoft.userId,
                        firstName: obj.microsoft.first_name,
                        lastName: obj.microsoft.last_name,
                        gender: ""
                    }
                }

                if (obj.twitter) {
                    return {
                        auth_userId: obj.twitter.userId,
                        firstName: "",
                        lastName: "",
                        gender: ""
                    }
                }
            }
        }
    }

});
