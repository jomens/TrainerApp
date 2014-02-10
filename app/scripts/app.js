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
                name: "feature-acct-mgmt",
                simpleRoutes: ["Signup", "Addclient", "AddTrainer", "Myclients", "Login", "Addfitnesschain",
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
      .otherwise({
          redirectTo: '/'
      });
})
.run(function ($rootScope, $location, Identity, $timeout) {

    $rootScope.$on('$routeChangeStart', function (evt, next, current) {

        var user = Identity.getLoggedInUser();

        if (!(user && user.auth_userId)) {
            if (next.templateUrl == "scripts/feature-acct-mgmt/v-login.html" || next.templateUrl == "scripts/feature-acct-mgmt/v-signup.html") {

            } else {
                $location.path("/login");
            }
        }
    });

});
