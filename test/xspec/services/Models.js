'use strict';

describe('Service: Models', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Models;
  beforeEach(inject(function (_Models_) {
    Models = _Models_;
  }));

  it('should do something', function () {
    expect(!!Models).toBe(true);
  });

});
