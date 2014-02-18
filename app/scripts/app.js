'use strict';

angular.module('TrainerApp', [
  'ngCookies',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  //'googlechart'
]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'zhlqVKKbFuYRyxvFatNOtEUpoCzmQQ84';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
}
])
.config(function ($routeProvider) {

    function setupRoutes() {
        var features = [
            {
                simpleRoutes: ["Admin", "Superadmin", "Welcome", "Dashboard"]
            },
            {
                name: "feature-signup",
                simpleRoutes: ["Signup"],
            },
            {
                name: "feature-acct-mgmt",
                simpleRoutes: ["Addclient", "AddTrainer", "Myclients", "Login", "Addfitnesschain",
                "AddFitnessCenter", "Pinreset", "Userportal", "Fitnesschainportal", "Fitnesscenterportal"],
                routesWithIds: ["EditClient", "Myclients", "MyTrainers"]
            },
            {
                name: "feature-training",
                simpleRoutes: ["Trainer", "Createroutine", "CreateRoutineAssignments", "Myroutines", "Selectclient",
                "Selectroutine", "Go", "Workout", "Summary", "Cardio"],
                routesWithIds: ["Myroutines", "RoutineDetails", "Go"]
            },
            {
                name: "feature-user-profiles",
                simpleRoutes: [],
                routesWithIds: ["Userprofile"]
            },
        ]

        function getTemplateUrl(folder, path) {
            if (folder) {
                return 'scripts/' + folder + '/v-' + path + '.html'
            }
            return 'views/' + path + '.html';
        }

        features.forEach(function (feature) {
            var folder = feature.name;

            feature.simpleRoutes.forEach(function (route) {
                var path = route.toLocaleLowerCase();
                $routeProvider.when('/' + path, {
                    templateUrl: getTemplateUrl(folder, path),
                    controller: route + 'Ctrl',
                    caseInsensitiveMatch: true
                })
            })

            if (feature.routesWithIds) {
                feature.routesWithIds.forEach(function (route) {
                    var path = route.toLocaleLowerCase();
                    $routeProvider.when('/' + path + '/:id', {
                        templateUrl: getTemplateUrl(folder, path),
                        controller: route + 'Ctrl',
                        caseInsensitiveMatch: true
                    })
                })
            }
           
        })
    }

    setupRoutes();

    $routeProvider
      .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .when('/trainer-signup', {
          templateUrl: 'scripts/feature-signup/v-trainer-signup.html',
          controller: 'SignupCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
})
.run(function ($rootScope, $location, Identity, $timeout, Azure) {

    $rootScope.$on('$routeChangeStart', function (evt, next, current) {

        var user = Identity.getLoggedInUser();
        var authedUser = Azure.Client().currentUser;

        if (user) {
            if (!user.auth_userId) {
                Identity.loggedOut(function () {
                    $location.path("/signup");
                })
            }
        } else {

            if (!authedUser) {
                if (next.templateUrl == "views/main.html" || next.templateUrl == "scripts/feature-acct-mgmt/v-login.html" ) {

                }
                else {
                    $location.path("/login");
                }
            } else if (authedUser) {
                ////if you're authenticated - wit no account: main, login, signup, trainer-singup

                if (next.templateUrl == "views/main.html" || 
                    next.templateUrl == "scripts/feature-acct-mgmt/v-login.html" ||
                    next.templateUrl == "scripts/feature-signup/v-signup.html" ||
                    next.templateUrl == "scripts/feature-signup/v-trainer-signup.html") {

                }
                else {
                    $location.path("/signup");
                }
            }

        }

       

        //if you're not authneticated: main, login
    });

    $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
    });
});
