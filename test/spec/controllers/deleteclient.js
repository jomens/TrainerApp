'use strict';

describe('Controller: DeleteclientCtrl', function () {

  // load the controller's module
  beforeEach(module('trainerApp'));

  var DeleteclientCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteclientCtrl = $controller('DeleteclientCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
