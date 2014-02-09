'use strict';

describe('Controller: CardioCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var CardioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CardioCtrl = $controller('CardioCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
