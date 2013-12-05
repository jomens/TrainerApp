'use strict';

describe('Controller: CreateroutineCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var CreateroutineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateroutineCtrl = $controller('CreateroutineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
