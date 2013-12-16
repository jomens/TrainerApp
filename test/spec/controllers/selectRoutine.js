'use strict';

describe('Controller: SelectroutineCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var SelectroutineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectroutineCtrl = $controller('SelectroutineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
