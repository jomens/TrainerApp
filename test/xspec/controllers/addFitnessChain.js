'use strict';

describe('Controller: AddfitnesschainCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var AddfitnesschainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddfitnesschainCtrl = $controller('AddfitnesschainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
