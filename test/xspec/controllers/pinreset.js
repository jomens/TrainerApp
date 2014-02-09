'use strict';

describe('Controller: PinresetCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var PinresetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PinresetCtrl = $controller('PinresetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
