'use strict';

describe('Service: Localstorage', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Localstorage;
  beforeEach(inject(function (_Localstorage_) {
    Localstorage = _Localstorage_;
  }));

  it('should do something', function () {
    expect(!!Localstorage).toBe(true);
  });

});
