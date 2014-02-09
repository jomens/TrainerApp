'use strict';

describe('Controller: AddgymCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var AddgymCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddgymCtrl = $controller('AddgymCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
