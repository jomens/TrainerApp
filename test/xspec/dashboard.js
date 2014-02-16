'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var MainCtrl;
  var scope;
  var rootScope = {};
  var settings = { init: jasmine.createSpy("init") }
  var Identity = { getLoggedInUser: Get.mock("idt") }
  var TrainerService = Get.TrainerService();
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('DashboardCtrl', {
        $scope: scope,
        $rootScope: rootScope,
        Settings: settings,
        Identity: Identity,
        TrainerService: Get.mock(),
        RoutineService: Get.mock
    });
  }));

  it('should call settings init', function () {
    expect(settings.init).toHaveBeenCalled();
  });

  it('should call identity.getLoggedInUser', function () {
      expect(Identity.getLoggedInUser).toHaveBeenCalled();
  });

  describe("If a user is logged in as a trainer", function () {

      beforeEach(inject(function ($controller, $rootScope) {
          scope = $rootScope.$new();
          MainCtrl = $controller('DashboardCtrl', {
              $scope: scope,
              $rootScope: rootScope,
              Settings: settings,
              Identity: { getLoggedInUser: function () { return { isTrainer: true }; } },
              TrainerService: TrainerService,
              RoutineService: Get.mock()
          });
      }));

      it('should get the non remote clients', function () {
          expect(TrainerService.getNonRemoteClients).toHaveBeenCalled();
      });

      it('should also get the remote clients', function () {
          expect(TrainerService.getRemoteClients).toHaveBeenCalled();
      });
  })
});
