'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('TrainerApp'));

  var MainCtrl;
  var scope;
  var rootScope = {};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
        $scope: scope,
        $rootScope: rootScope
    });
  }));

  it('should set hero on to true on rootScope', function () {
    expect(rootScope.heroOn).toBe(true);
  });
});
