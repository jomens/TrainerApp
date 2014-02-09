'use strict';

describe('Service: Trainerservice', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Trainerservice;
  beforeEach(inject(function (_Trainerservice_) {
    Trainerservice = _Trainerservice_;
  }));

  it('should do something', function () {
    expect(!!Trainerservice).toBe(true);
  });

});
