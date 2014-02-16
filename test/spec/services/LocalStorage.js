'use strict';

describe('Service: Localstorage', function () {

    var amplify =  {store: jasmine.createSpy("amplify") }
    var user = Get.Models.User();
  // load the service's module
    TestHelper.setupModule({ name: "Amplify", mock: amplify })

  // instantiate service
    var LocalStorage;
    var x;
  beforeEach(inject(function (_LocalStorage_) {
      LocalStorage = _LocalStorage_;
  }));

  describe("When setting logged in user", function () {

      beforeEach(function () {
          LocalStorage.loggedInUser().set(user);
      });

      it("should set logged in user", function () {
          expect(amplify.store).toHaveBeenCalledWith("loggedInUser", user);
      });
  });
        
  describe("When getting logged in user", function () {

      beforeEach(function () {
          LocalStorage.loggedInUser().get();
      });

      it("should set logged in user", function () {
          expect(amplify.store.mostRecentCall.args[0]).toEqual("loggedInUser");
          expect(amplify.store.mostRecentCall.args[1]).not.toBeDefined();
      });
  });

});
