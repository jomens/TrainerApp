'use strict';

describe('Service: Environment', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Environment;
  beforeEach(inject(function (_Environment_) {
    Environment = _Environment_;
  }));

  it('should do something', function () {
    expect(!!Environment).toBe(true);
  });

});
