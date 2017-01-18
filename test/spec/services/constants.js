'use strict';

describe('Service: constants', function () {

  // load the service's module
  beforeEach(module('pasaplataMakerApp'));

  // instantiate service
  var constants;
  beforeEach(inject(function (_constants_) {
    constants = _constants_;
  }));

  it('should do something', function () {
    expect(!!constants).toBe(true);
  });

});
