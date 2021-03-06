'use strict';

describe('Controller: GoCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var GoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoCtrl = $controller('GoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
