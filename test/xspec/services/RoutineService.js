'use strict';

describe('Service: Routineservice', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Routineservice;
  beforeEach(inject(function (_Routineservice_) {
    Routineservice = _Routineservice_;
  }));

  it('should do something', function () {
    expect(!!Routineservice).toBe(true);
  });

});
