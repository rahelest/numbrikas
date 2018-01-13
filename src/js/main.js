window.Appy = angular.module('numberApp', ["ngResource"]);

Appy.controller("numberController", ['$scope', '$rootScope', '$resource', 'pairChecker', 'historyProvider', 'helperService', 'loadSaveProvider', 'expandService',
                                     function ($scope, $rootScope, $resource, pairChecker, history, helper, loadSave, expand) {

	/*
	 * Algus: 22:30
	 * Valmis 1:30
	 */

	var init = [ {row: 0, data: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
	             {row: 1, data: [1, 1, 1, 2, 1, 3, 1, 4, 1]},
				 {row: 2, data: [5, 1, 6, 1, 7, 1, 8, 1, 9]}];

	$rootScope.table = [];
	$rootScope.rowBlank = [];

	$rootScope.helperNums = {};
	$rootScope.firstHiddenRow = 0;

	loadSave.parseArray(init);

  connectHandlers();

	$scope.write = function (text) {
		$scope.msgs.push(text);
	};

	$scope.msgs = [];


	var updateHelper = function () {
		helper.update();
	};

  function connectHandlers() {
    $scope.select = pairChecker.select;

    $scope.expand = function () {
      expand.expand();
      
      $scope.helperNeeded = true;
      updateHelper();
    };

    $scope.login = function () {
      $scope.loggedIn = true;
    };

    $scope.parse = function () {
      var json = $scope.json;
      loadSave.importTable(json);

      $scope.helperNeeded = true;
      updateHelper();
    };

    $scope.save = function () {
      $scope.json = loadSave.exportTable();
    };

    $scope.undo = history.undo;

    $("html").keyup(function (e) {
      if (e.which == 69) {
        updateHelper();
        $rootScope.$apply();
      }
    });

    $(window).scroll(function () {
      updateHelper();
      $rootScope.$apply();
    });
  }

}]);
