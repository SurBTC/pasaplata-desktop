'use strict';

/**
 * @ngdoc directive
 * @name pasaplataMakerApp.directive:validators
 * @description
 * # validators
 */
angular.module('pasaplataMakerApp')

.directive('maxValue', function (_) {
  /*
  * validates a max numerical value for string input
  */
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      // validate once balances have been updated
      scope.$on('getBalances', function(event, args) {
        scope.$apply(function() {
          if (!_.isNumber(attr.maxValue)) {
            attr.maxValue = args[attr.maxValue.split('.')[1]];
          }
        });
      });

      var validator = function(value) {
        var valueAsNumber = value ? _.toNumber(value.replace(/[a-zA-Z!\?>:;,\$\|<@#%\^&\*\)\(\+\/\\={}\[\]_]/g, '')) : 0;

        if (_.isNumber(attr.maxValue)) {
          if (valueAsNumber <= _.toNumber(attr.maxValue)) {
            ctrl.$setValidity('maxValue', true);
            return value;
          } else {
            ctrl.$setValidity('maxValue', false);
            return value;
          }
        } else {
          ctrl.$setValidity('maxValue', true);
          return value;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('maxValue', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
})

.directive('minValue', function (_) {
  /*
  * validates a min numerical value for string input
  */
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, elm, attr, ctrl) {
      if (!ctrl) {
        return;
      }

      var validator = function(value) {
        var valueAsNumber = value ? _.toNumber(value.replace(/[a-zA-Z!\?>:;,\$\|<@#%\^&\*\)\(\+\/\\={}\[\]_]/g, '')) : 0;

        if (attr.minValue) {
          if (valueAsNumber >= _.toNumber(attr.minValue)) {
            ctrl.$setValidity('minValue', true);
            return value;
          } else {
            ctrl.$setValidity('minValue', false);
            return value;
          }
        } else {
          ctrl.$setValidity('minValue', true);
          return value;
        }
      };

      ctrl.$formatters.push(validator);
      ctrl.$parsers.unshift(validator);
      attr.$observe('minValue', function() {
        validator(ctrl.$viewValue);
      });
    }
  };
});
