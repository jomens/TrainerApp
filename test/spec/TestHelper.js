var TestHelper = {
    setupModule: function (deps) {
        if (!deps) {
            beforeEach(module('TrainerApp'));
        } else {
            beforeEach(function () {
                module('TrainerApp', function ($provide) {
                    if (angular.isArray(deps)) {
                        deps.forEach(function (dep) {
                            $provide.value(dep.name, dep.mock);
                        });
                    }
                    else {
                        $provide.value(deps.name, deps.mock);

                    }
                });

            })

        }


    }
}