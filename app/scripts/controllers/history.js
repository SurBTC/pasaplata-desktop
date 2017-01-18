'use strict';

/**
 * @ngdoc function
 * @name pasaplataMakerApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the pasaplataMakerApp
 */
angular.module('pasaplataMakerApp')
  .controller('HistoryCtrl', function ($scope, store, $location) {
    $scope.executedRemittances = store.get('executedRemittances') || {};

  });
