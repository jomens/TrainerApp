'use strict';

describe('Controller: AlllocationsCtrl', function () {

  // load the controller's module
  beforeEach(module('trainerApp'));

  var AlllocationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlllocationsCtrl = $controller('AlllocationsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
