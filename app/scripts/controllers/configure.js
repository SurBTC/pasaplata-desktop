'use strict';

/**
 * @ngdoc function
 * @name pasaplataMakerApp.controller:ConfigureCtrl
 * @description
 * # ConfigureCtrl
 * Controller of the pasaplataMakerApp
 */
angular.module('pasaplataMakerApp')
  .controller('ConfigureCtrl', function ($rootScope, $scope, $location, store) {
    $scope.advanced = false;
    $scope.makerOptions = {
      apiUrl: 'https://www.surbtc.com/api/v1',
      apiKey: '',
      apiSecret: '',
      processorFee: 0,
      btcInsurance: 0.015,
      sourceCurrencyDepositFee: 0,
      destinationCurrencyWithdrawalFee: 0.004,
      destinationCurrencyWithdrawalFixedFee: 5500
    };

    $scope.setOptions = function () {
      if ($scope.makerOptions.apiKey && $scope.makerOptions.apiSecret) {
        store.set('apiUrl', $scope.makerOptions.apiUrl)
        store.set('apiKey', $scope.makerOptions.apiKey);
        store.set('apiSecret', $scope.makerOptions.apiSecret);
        store.set('processorFee', $scope.makerOptions.processorFee);
        store.set('apiBtcInsurance', $scope.makerOptions.btcInsurance);
        store.set('sourceCurrencyDepositFee', $scope.makerOptions.sourceCurrencyDepositFee);
        store.set('destinationCurrencyWithdrawalFee', $scope.makerOptions.destinationCurrencyWithdrawalFee);
        store.set('destinationCurrencyWithdrawalFixedFee', $scope.makerOptions.destinationCurrencyWithdrawalFixedFee);
        $location.path('/');
      } else {
        window.alert('Ingrese un api key y api secret');
      }
    };
  });
