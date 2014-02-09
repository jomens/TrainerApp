'use strict';

describe('Controller: SuperadminCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var SuperadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperadminCtrl = $controller('SuperadminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
