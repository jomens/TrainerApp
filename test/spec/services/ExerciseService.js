'use strict';

describe('Service: Exerciseservice', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Exerciseservice;
  beforeEach(inject(function (_Exerciseservice_) {
    Exerciseservice = _Exerciseservice_;
  }));

  it('should do something', function () {
    expect(!!Exerciseservice).toBe(true);
  });

});
