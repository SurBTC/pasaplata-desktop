'use strict';

/**
 * @ngdoc function
 * @name pasaplataMakerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pasaplataMakerApp
 */
angular.module('pasaplataMakerApp')
  .controller('MainCtrl', function ($rootScope, $scope, $location, store, getBalances, SURBTC_REST_CLIENT, REMITTANCE_MAKER, _) {
    // make lodash available for templates
    $scope._ = _;

    // reset function
    $scope.reset = function () {
      $scope.configure = false;
      $rootScope.maker = null;
      $scope.makerOptions = {
        apiUrl: store.get('apiUrl') || 'https://www.surbtc.com/api/v1',
        apiKey: store.get('apiKey') || '',
        apiSecret: store.get('apiSecret') || '',
        processorFee: store.get('processorFee') || 0,
        btcInsurance: store.get('apiBtcInsurance') || 0,
        sourceCurrencyDepositFee: store.get('sourceCurrencyDepositFee') || 0,
        destinationCurrencyWithdrawalFee: store.get('destinationCurrencyWithdrawalFee') || 0,
        destinationCurrencyWithdrawalFixedFee: store.get('destinationCurrencyWithdrawalFixedFee') || 0
      };
      $rootScope.restClient = null;
      $rootScope.balances = null;
      $scope.loading = false;
      $scope.sourceCurrency = 'CLP';
      $scope.sourceAmount = null;
      $scope.destinationCurrency = 'COP';
      $scope.destinationAmount = null;
      $scope.quotation = false;
      $scope.quotationStatus = false;
      $scope.remittance = null;
      $scope.executedRemittances = store.get('executedRemittances') || {};
      // show errors
      $scope.error = null;
    };

    $scope.reset();

    // initialize REMITTANCE_MAKER
    $scope.initialize = function () {
      $scope.loading = true;
      if ($scope.makerOptions.apiKey && $scope.makerOptions.apiSecret) {
        $rootScope.maker = new REMITTANCE_MAKER($scope.makerOptions);
        $rootScope.restClient = new SURBTC_REST_CLIENT({
          api: $scope.makerOptions.apiUrl,
          key: $scope.makerOptions.apiKey,
          secret: $scope.makerOptions.apiSecret
        });
        // get balances
        getBalances.doIt();

      } else {
        $location.path('/configure');
      }
    };

    $scope.initialize();

    // quote function
    $scope.quote = function () {
      $scope.quotationStatus = 'pending';
      var quoteOpts = false;
      if ($scope.sourceAmount) {
        quoteOpts = {
          sourceAmount: Number($scope.sourceAmount),
          sourceCurrency: $scope.sourceCurrency
        };
      } else if ($scope.destinationAmount) {
        quoteOpts = {
          destinationAmount: Number($scope.destinationAmount),
          destinationCurrency: $scope.destinationCurrency
        };
      } else {
        $scope.quotationStatus = false;
        quoteOpts = false;
      }

      if (quoteOpts && quoteOpts.sourceAmount) {
        $rootScope.maker.quoteRemittanceFixedSource(quoteOpts, function (err, response) {
          if (err) {
            $scope.quotationStatus = 'failed';
            $scope.error = err;
            $scope.$digest();
          } else {
            $scope.quotationStatus = 'received';
            $scope.quotation = response.quotation;
            $scope.$digest();
          }
        });
      }
    };

    $scope.resetQuote = function () {
      $scope.quotationStatus = false;
      $scope.sourceAmount = null;
    };

    $scope.executeQuote = function() {
      $scope.quotationStatus = 'accepted';
      var opts = {
        btcAmount: $scope.quotation.btcToBuy,
        destinationCurrency: $scope.destinationCurrency
      };

      $rootScope.maker.executeRemittance(opts, function (err, res) {
        if (err) {
          $scope.quotationStatus = 'failed';
          $scope.error = err;
          $scope.$digest();
        } else {
          // get balances
          getBalances.doIt();
          $scope.quotationStatus = 'executed';
          delete res.statusCode;
          delete res.success;
          $scope.remittance = res;
          $scope.saveRemittance();
        }
      });

    };

    $scope.saveRemittance = function () {
      // evaluate remittance
      $scope.remittance.amountClp = Math.round($scope.remittance.buyOrder.tradedOrder.total_exchanged / 100);
      $scope.remittance.amountCop = $scope.remittance.sellOrder.tradedOrder.total_exchanged / 100 - $scope.remittance.sellOrder.tradedOrder.paid_fee / 100;

      // compare destination_amount and amountCop
      $scope.remittance.marginCop = $scope.remittance.amountCop - $scope.quotation.destinationAmountNoFees;
      $scope.remittance.marginClp = $scope.quotation.sourceAmount - $scope.remittance.amountClp;

      $scope.remittance.destinationAmountNoFees = $scope.quotation.destinationAmountNoFees;
      // store remittance
      var remittanceId = new Date().getTime();
      $scope.executedRemittances[remittanceId] = $scope.remittance;
      store.set('executedRemittances', $scope.executedRemittances);

      //update scope
      $scope.$digest();

    };

    // listeners
    $scope.$on('getBalances', function(event, args) {
      $scope.$apply(function() {
        $scope.loading = false;
        if (args.success === false) {
          $scope.error = args;
        } else {
          $rootScope.balances = args;
        }
      });
    });

  });
