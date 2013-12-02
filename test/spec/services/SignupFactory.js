'use strict';

describe('Service: Signupfactory', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Signupfactory;
  beforeEach(inject(function (_Signupfactory_) {
    Signupfactory = _Signupfactory_;
  }));

  it('should do something', function () {
    expect(!!Signupfactory).toBe(true);
  });

});
