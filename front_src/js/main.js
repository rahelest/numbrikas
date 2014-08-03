window.Appy = angular.module('numberApp', ["ngResource"]);

Appy.controller("numberController", ['$scope', '$rootScope', '$resource', 'pairChecker', 'historyProvider', 'helperService', 
                                     function ($scope, $rootScope, $resource, pairChecker, history, helper) {
	
	/*
	 * Algus: 22:30
	 * Valmis 1:30
	 * TODO: salvestamine
	 * TODO: back
	 */
	
	var init = [ {row: 0, data: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
	             {row: 1, data: [1, 1, 1, 2, 1, 3, 1, 4, 1]},
				 {row: 2, data: [5, 1, 6, 1, 7, 1, 8, 1, 9]}];
	
	$rootScope.table = [];
	$rootScope.rowBlank = [];
	
	$rootScope.helperNums = {};
	$rootScope.firstHiddenRow = 0;
	
	$scope.parseArray = function (data) {
		
		$rootScope.table = [];
		$rootScope.rowBlank = [];
		var rowIndex = 0;
		
		var previousRowNumber = data[0].row - 1;
		for (var importDataIndex = 0; importDataIndex < data.length; importDataIndex++, rowIndex++) {
			
			var newRowNumber = data[importDataIndex].row;
			var rowDifference = newRowNumber - previousRowNumber;
			if (rowDifference > 1) {
				console.log("rowDifference", rowDifference);
				while (rowDifference > 1) {
					$rootScope.table.push([]);
					$rootScope.rowBlank.push(true);
					for (var col = 0; col < 9; col++) {
						$rootScope.table[rowIndex].push({val: "", selected: false, row: rowIndex, col: col});
					}
					rowDifference--;
					rowIndex++;
				}
			}
			
			$rootScope.rowBlank.push(false);
			
			$rootScope.table.push([]);
			var rowArray = data[importDataIndex].data;
			for (var col = 0; col < rowArray.length; col++) {
				$rootScope.table[rowIndex].push({val: rowArray[col], selected: false, row: rowIndex, col: col});
			}
			
			previousRowNumber = newRowNumber;
			
		}
	};
	
	$scope.parseArray(init);
	
	$scope.select = pairChecker.select;

	var expanded = 0;
	$scope.expand = function () {
		expanded++;
		var initTable = JSON.parse(JSON.stringify($rootScope.table));
		
		for (var row = 0; row < initTable.length; row++) {
			for (var col = 0; col < initTable[row].length; col++) {
				var cell = initTable[row][col];
				if (cell.val != "") {
					addToTable(cell.val);
				}
			}
		}
		
		if (expanded > 0) {
			$scope.helperNeeded = true;
			updateHelper();
		}
	};
	
	var addToTable = function (cellValue) {
		var tableLen = $rootScope.table.length;
		var lastRow = $rootScope.table[tableLen - 1];
		
		if (lastRow.length < 9) {
			lastRow.push({val: cellValue, selected: false, row: tableLen - 1, col: lastRow.length});
		} else {
			$rootScope.table.push([{val: cellValue, selected: false, row: tableLen, col: 0}]);
		}
	};
	
	$(window).scroll(function () {
		updateHelper();
		$rootScope.$apply();
	});
	
	$scope.write = function (text) {
		$scope.msgs.push(text);
	};
	
	$scope.msgs = [];
	
	$scope.login = function () {
		$scope.loggedIn = true;
	};
	
	$scope.load = function () {
		/*$rootScope.table = $resource("game.json").query(function (u) {
		});*/
		
//		$scope.showTextArea = true;
	};
	
	$scope.parse = function () {
		var json = $scope.json;
		if (!json) return;
		
		var parsed = JSON.parse(json);
		$scope.parseArray(parsed);
		
		$scope.helperNeeded = true;
		updateHelper();
	};
	
	$scope.save = function () {
		var tableSize = $rootScope.table.length;
		var compressedTable = [];
		
		for (var i = 0; i < tableSize; i++) {
			if (!$rootScope.rowBlank[i]) {
				var elements = $scope.getArrayOfElementsOnRow(i);
				compressedTable.push({ row: i, data: elements});
			}
		}
		
		$scope.json = JSON.stringify(compressedTable);
	};
	
	$scope.getArrayOfElementsOnRow = function (rowNumber) {
		var elements = [];
		var row = $rootScope.table[rowNumber];
		
		for (var i = 0; i < row.length; i++) {
			elements.push(row[i].val);
		}
		return elements;
	};
	
	$scope.undo = history.undo;
	
	$("html").keyup(function (e) {
		if (e.which == 69) { 
			updateHelper();
			$rootScope.$apply();
		}
	});
	
	var updateHelper = function () {
		helper.update();
	};
	
}]);