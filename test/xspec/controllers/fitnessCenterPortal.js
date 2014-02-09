'use strict';

describe('Controller: FitnesscenterportalCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var FitnesscenterportalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FitnesscenterportalCtrl = $controller('FitnesscenterportalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
