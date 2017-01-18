'use strict';
const remittanceMaker = require('remittance-maker');
const surBtcRestClient = require('surbtc-rest-client');
const async = require('async');
const _ = require('lodash');
const bitcoinMath = require('bitcoin-math');

/**
 * @ngdoc service
 * @name pasaplataMakerApp.constants
 * @description
 * # constants
 * Constant in the pasaplataMakerApp.
 */
angular.module('pasaplataMakerApp')
  .constant('_', _)
  .constant('REMITTANCE_MAKER', remittanceMaker)
  .constant('SURBTC_REST_CLIENT', surBtcRestClient)
  .constant('ASYNC', async)
  .constant('BITCOIN_MATH', bitcoinMath);
