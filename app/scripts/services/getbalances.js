'use strict';

/**
 * @ngdoc service
 * @name pasaplataMakerApp.getBalances
 * @description
 * # getBalances
 * Service in the pasaplataMakerApp.
 */
angular.module('pasaplataMakerApp')
  .service('getBalances', function ($rootScope, ASYNC, BITCOIN_MATH) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.doIt = function() {
      ASYNC.series({
        clp: function(cb) {
          $rootScope.restClient.getBalances('clp', function(err, balance){
            if (err) {
              cb(err, null);
            } else {
              cb(null,balance);
            }
          });
        },
        cop: function(cb) {
          $rootScope.restClient.getBalances('cop', function(err, balance){
            if (err) {
              cb(err, null);
            } else {
              cb(null,balance);
            }
          });
        },
        btc: function(cb) {
          $rootScope.restClient.getBalances('btc', function(err, balance){
            if (err) {
              cb(err, null);
            } else {
              cb(null,balance);
            }
          });
        }
      }, function(err, result) {
        if (err) {
          $rootScope.$broadcast('getBalances', err);
        } else {
          result.clp = result.clp.balance.available_amount / 100;
          result.cop = result.cop.balance.available_amount / 100;
          result.btc = result.btc.balance.available_amount.toBitcoin();
          $rootScope.$broadcast('getBalances', result);
        }
      });
    };
  });
