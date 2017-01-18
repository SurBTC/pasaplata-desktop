'use strict';

/**
 * @ngdoc directive
 * @name pasaplataMakerApp.directive:directives
 * @description
 * # directives
 */
angular.module('pasaplataMakerApp')
.directive('focusHere', function ($timeout) {
  return function($scope, element) {
    $timeout(function(){
      $scope.$watch(function () {return element.css('visibility');}, function(newValue) {
        if (newValue === 'visible') {
         element.focus();
        }
      });
    });
  };
})

.directive('focusNext', function(_) {
  return {
    restrict: 'A',
    link: function($scope, elem, attr) {

      /** Usage:
        <input focus-next="here">
        <input id="here">
        Upon pressing ENTER key the directive will switch focus to
        the next declared field
        The last field should not have next-focus directive to avoid
        focusing on non-existing element.
        Works for Web, iOS (Go button) & Android (Next button) browsers,
      **/

      // for buttons on mobile
      if (_.toString(elem[0].nodeName) === 'BUTTON') {
        elem.bind('click', function(e) {
          e.preventDefault();
          document.querySelector('#' + _.toString(attr.focusNext)).focus();
        });
      }

      //for text input
      elem.bind('keydown', function(e) {
        var code = e.keyCode || e.which;

        // catch enter
        if (code === 13) {
          e.preventDefault();
          document.querySelector('#' + _.toString(attr.focusNext)).focus();
        }

        // catch tab as "enter" on input type tel
        if (code === 9 && !e.shiftKey) {
          e.preventDefault();
          document.querySelector('#' + _.toString(attr.focusNext)).focus();
        }
      });
    }
  };
})

.directive('onError', function(_) {
  return {
    restrict: 'AE',
    link: function($scope, elem, attr) {

      /** Usage:
        The input group must be in a parent div with class="input-group" in order to use bootstrap classes
        Fields must have a name property
        on-error must be called with "fieldName:errorType:message"
        optional set 4th param to update inmediately and not wait until on blur event
        on-error must be called with "fieldName:errorType:message:I"
        example <div on-error="srcAmnt:required:Debes llenar este campo">
      **/

      var fieldName = attr.onError.split(':')[0];
      var errorName = attr.onError.split(':')[1];
      var errorMessage = typeof attr.onError.split(':')[2] === 'undefined' ? 'error' : attr.onError.split(':')[2];
      var updateInmediate = typeof attr.onError.split(':')[3] === 'undefined' ? false : true;
      var formController = elem.inheritedData('$formController');
      var formName = formController.$name;
      var targetElement = angular.element(document.getElementsByName(fieldName));

      function updateError() {
        var field = formController[fieldName];
        var fieldErrors = field.$error;

        if (!field) {
          return;
        }

        if (fieldErrors[errorName]) {
          var doUpdate = function() {
            // error is activated
            // add message if not already
            if (elem[0].firstElementChild && elem[0].firstElementChild.id === 'helpBlock' + errorName) {
              return;
            } else {
              elem.append('<span id="helpBlock' + errorName + '"' + 'class="help-block" style="">' + errorMessage + '</span>');
            }
            // set bootstrap class
            //if (targetElement[0].parentElement && targetElement[0].parentElement.className === 'input-group') {
            if (targetElement.parent().hasClass('input-group')) {
              targetElement.parent().removeClass('input-group').addClass('input-group has-error');
            }
          };

          if (updateInmediate) {
            doUpdate();
          } else {
            targetElement.on('blur', function () {
              // check relevance again
              if (fieldErrors[errorName]) {
                doUpdate();
              }
            });
          }

        } else  if (_.isEmpty(fieldErrors)) {
          // remove message
          if (elem[0].firstElementChild && elem[0].firstElementChild.id === 'helpBlock' + errorName) {
            elem[0].firstElementChild.remove();
          }
          // and reset bootstrap class
          if (targetElement.parent().hasClass('input-group has-error')) {
            targetElement.parent().removeClass('input-group has-error').addClass('input-group');
          }
        } else {
          return;
        }
      }

      $scope.$watch(formName + '.' + fieldName + '.$error', updateError, true);
      $scope.$watch(formName + '.' + fieldName + '.$pristine', updateError);
    }
  };
});
