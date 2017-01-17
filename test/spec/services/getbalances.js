'use strict';

describe('Service: getBalances', function () {

  // load the service's module
  beforeEach(module('pasaplataMakerApp'));

  // instantiate service
  var getBalances;
  beforeEach(inject(function (_getBalances_) {
    getBalances = _getBalances_;
  }));

  it('should do something', function () {
    expect(!!getBalances).toBe(true);
  });

});
