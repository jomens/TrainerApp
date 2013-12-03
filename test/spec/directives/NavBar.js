'use strict';

describe('Directive: NavBar', function () {

  // load the directive's module
  beforeEach(module('TrainerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-nav-bar></-nav-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the NavBar directive');
  }));
});
