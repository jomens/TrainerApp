'use strict';

describe('Service: Notifier', function () {

  // load the service's module
  beforeEach(module('TrainerApp'));

  // instantiate service
  var Notifier;
  beforeEach(inject(function (_Notifier_) {
    Notifier = _Notifier_;
  }));

  it('should do something', function () {
    expect(!!Notifier).toBe(true);
  });

});
