'use strict';

/**
 * @ngdoc service
 * @name pasaplataMakerApp.getBalances
 * @description
 * # getBalances
 * Service in the pasaplataMakerApp.
 */
angular.module('pasaplataMakerApp')
  .service('getBalances', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.doIt = function() {
      $rootScope.processing = true;
      async.series({
        clp: function(cb) {
          $rootScope.restClient.getBalances('clp', function(err, balance){
            if (err) {
              cb(err, null);
            } else {
              cb(null,balance)
            }
          })
        },
        cop: function(cb) {
          $rootScope.restClient.getBalances('cop', function(err, balance){
            if (err) {
              cb(err, null);
            } else {
              cb(null,balance)
            }
          })
        },
        btc: function(cb) {
          $rootScope.restClient.getBalances('btc', function(err, balance){
            if (err) {
              cb(err, null);
            } else {
              cb(null,balance)
            }
          })
        }
      }, function(err, result) {
        if (err) {
          $rootScope.processing = false;
          $rootScope.error.status = true;
          $rootScope.error.message = err;
          console.log(err);
        } else {
          $rootScope.processing = false;
          $rootScope.balances.clp = result.clp.balance.available_amount / 100
          $rootScope.balances.cop = result.cop.balance.available_amount / 100
          $rootScope.balances.btc = result.btc.balance.available_amount
          console.log($rootScope.balances);
        }
      })
    }
  });
