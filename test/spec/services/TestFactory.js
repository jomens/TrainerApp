'use strict';

describe('Service: Testfactory', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Testfactory;
  beforeEach(inject(function (_Testfactory_) {
    Testfactory = _Testfactory_;
  }));

  it('should do something', function () {
    expect(!!Testfactory).toBe(true);
  });

});
