'use strict';

describe('Controller: ConfigureCtrl', function () {

  // load the controller's module
  beforeEach(module('pasaplataMakerApp'));

  var ConfigureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigureCtrl = $controller('ConfigureCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfigureCtrl.awesomeThings.length).toBe(3);
  });
});
