'use strict';

describe('Service: Clientservice', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Clientservice;
  beforeEach(inject(function (_Clientservice_) {
    Clientservice = _Clientservice_;
  }));

  it('should do something', function () {
    expect(!!Clientservice).toBe(true);
  });

});
