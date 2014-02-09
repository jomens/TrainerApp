'use strict';

describe('Controller: FitnesschainportalCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var FitnesschainportalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FitnesschainportalCtrl = $controller('FitnesschainportalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});