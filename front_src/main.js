window.Appy = angular.module('numberApp', ["ngResource"]);

Appy.controller("numberController", ['$scope', '$resource', function ($scope, $resource) {
	
	/*
	 * Algus: 22:30
	 * Valmis 1:30
	 * TODO: salvestamine
	 * TODO: back
	 */
	
	var init = [ {row: 0, data: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
	             {row: 1, data: [1, 1, 1, 2, 1, 3, 1, 4, 1]},
				 {row: 2, data: [5, 1, 6, 1, 7, 1, 8, 1, 9]}];
	
	$scope.table = [];
	$scope.rowBlank = [];
	
	
	
	$scope.parseArray = function (data) {
		
		$scope.table = [];
		$scope.rowBlank = [];
		var rowIndex = 0;
		
		var previousRowNumber = data[0].row - 1;
		for (var importDataIndex = 0; importDataIndex < data.length; importDataIndex++, rowIndex++) {
			
			var newRowNumber = data[importDataIndex].row;
			var rowDifference = newRowNumber - previousRowNumber;
			if (rowDifference > 1) {
				console.log("rowDifference", rowDifference);
				while (rowDifference > 1) {
					$scope.table.push([]);
					$scope.rowBlank.push(true);
					for (var col = 0; col < 9; col++) {
						$scope.table[rowIndex].push({val: "", selected: false, row: rowIndex, col: col});
					}
					rowDifference--;
					rowIndex++;
				}
			}
			
			$scope.rowBlank.push(false);
			
			$scope.table.push([]);
			var rowArray = data[importDataIndex].data;
			for (var col = 0; col < rowArray.length; col++) {
				$scope.table[rowIndex].push({val: rowArray[col], selected: false, row: rowIndex, col: col});
			}
			
			previousRowNumber = newRowNumber;
			
		}
	};
	
	$scope.parseArray(init);
	
	$scope.selectedCells = [];
	
	$scope.select = function (cell) {
		cell.selected = !cell.selected;
		
		if (cell.selected) {
			var len = $scope.selectedCells.length;
			if (len == 0) {
				$scope.selectedCells.push(cell);
			} else if (len == 1) {
				$scope.selectedCells.push(cell);
				if (checkSelected()) {
					removeSelected();
				}
				unSelectSelected();
			}
		} else {
			var len = $scope.selectedCells.length;
			if (len == 1) {
				$scope.selectedCells = [];
			} else {
				//console.log("KUIDAS?? $scope.selectedCells.len != 1");
			}
		}
	};
	
	var checkSelected = function () {
		//kohakuti, kõrvuti
		
		var cell1 = $scope.selectedCells[0];
		var cell2 = $scope.selectedCells[1];
		
		if (!valuesOK()) {
			return false;
		}
		
		if (cell1.row == cell2.row && Math.abs(cell1.col - cell2.col) == 1) {
			return true;
		} else if (cell1.col == cell2.col && Math.abs(cell1.row - cell2.row) == 1) {
			return true;
		} else if (verticallyOK() || horizontallyOK()) {
			return true;
		} else {
			return false;
		}
		
		
	};
	
	var valuesOK = function () {
		var cell1 = $scope.selectedCells[0];
		var cell2 = $scope.selectedCells[1];
		
		if (cell1 === "" || cell2 === "") return false;
		
		return  (cell1.val == cell2.val || cell1.val + cell2.val == 10);
	};
	
	var verticallyOK = function () {
		// kohakuti juba ära olnud
		
		var cell1 = $scope.selectedCells[0];
		var cell2 = $scope.selectedCells[1];
		
		if (cell1.col != cell2.col) {
			return false;
		}
		
		if (cell1.row > cell2.row) { // ülevalpool olev esimeseks
			var temp = cell1;
			cell1 = cell2;
			cell2 = temp;
			
		}
		
		var col = cell1.col;
		for (var row = cell1.row + 1; row < cell2.row; row++) {
			var cell = $scope.table[row][col];
			if (cell.val != "") {
				return false;
			}
		}
		return true;
	};
	
	var horizontallyOK = function () {
		//kõrvuti on juba ära olnud
		
		var cell1 = $scope.selectedCells[0];
		var cell2 = $scope.selectedCells[1];
		
		if (cell1.row > cell2.row || (cell1.row == cell2.row && cell1.col > cell2.col)) {
			var temp = cell1;
			cell1 = cell2;
			cell2 = temp;
		}
		
		var row = cell1.row;
		if (cell1.row == cell2.row) {
			for (var col = cell1.col + 1; col < cell2.col; col++) {
				var cell = $scope.table[row][col];
				if (cell.val != "") {
					return false;
				}
			}
		} else {
			// erinevatel ridadel
			if (cell2.row - cell1.row > 1) {
				//kaugemal kui kohakuti read
				for (var row = cell1.row + 1; row < cell2.row; row++) {
					if (!$scope.rowBlank[row]) {
						//antud rida ei ole tühi
						return false;
					}
				}
			}
			
			var row = cell1.row;
			for (var col = cell1.col + 1 ; col < 9; col++) {
				var cell = $scope.table[row][col];
				if (cell.val != "") {
					return false;
				}
			}
			
			row = cell2.row;
			for (var col = 0; col < cell2.col; col++) {
				var cell = $scope.table[row][col];
				if (cell.val != "") {
					return false;
				}
			}
		}
		
		return true;
		
	};
	
	var removeSelected = function () {
		
		//TODO
		var cell1 = $scope.selectedCells[0];
		var cell2 = $scope.selectedCells[1];
		
		cell1.val = "";
		cell2.val = "";
		
		//TODO: ega nüüd tühja rida tekkinud?
		
		var rows = [cell1.row, cell2.row];
		
		for (var i = 0; i < 2; i++) {
			var row = $scope.table[rows[i]];
			var valueFound = false;
			for (var col = 0; col < 9; col++) {
				if (!row[col] || row[col].val != "") {
					valueFound = true;
					break;
				}
			}
			
			$scope.rowBlank[rows[i]] = !valueFound;
		}
		
//		$scope.editHelper();
	};
	
	var unSelectSelected = function () {
		$scope.selectedCells[0].selected = false;
		$scope.selectedCells[1].selected = false;
		$scope.selectedCells = [];
	};
	
	var expanded = 0;
	$scope.expand = function () {
		expanded++;
		var initTable = JSON.parse(JSON.stringify($scope.table));
		
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
			$scope.editHelper();
		}
	};
	
	var addToTable = function (cellValue) {
		var tableLen = $scope.table.length;
		var lastRow = $scope.table[tableLen - 1];
		
		if (lastRow.length < 9) {
			lastRow.push({val: cellValue, selected: false, row: tableLen - 1, col: lastRow.length});
		} else {
			$scope.table.push([{val: cellValue, selected: false, row: tableLen, col: 0}]);
		}
	};
	
	$scope.write = function (text) {
		$scope.msgs.push(text);
	};
	
	$scope.msgs = [];
	
	$scope.login = function () {
		$scope.loggedIn = true;
	};
	
	$scope.load = function () {
		/*$scope.table = $resource("game.json").query(function (u) {
		});*/
		
//		$scope.showTextArea = true;
	};
	
	$scope.parse = function () {
		var json = $scope.json;
		if (!json) return;
		var parsed = JSON.parse(json);
		console.log(parsed);
		$scope.parseArray(parsed);
	};
	
	$scope.helperNums = [1, 2, 3, 4, 4, 4, 4, 4, 5];
	
	$scope.editHelper = function () {
		var firstHiddenRow = $scope.firstHiddenRow = $scope.findFirstHiddenRow();
		for (var i = 0; i < 9; i++) {
			var activeRow = firstHiddenRow;
			var foundNumber = "";
			
			while (activeRow >= 0 && !foundNumber) {
				foundNumber = $scope.table[activeRow][i].val;
				activeRow--;
			}
			
			$scope.helperNums[i] = foundNumber;
		}
	};
	
	$(window).scroll($scope.editHelper);
	
	$scope.rowFinderModifier = 2.2;
	$scope.printHelper = false;
	
	$scope.findFirstHiddenRow = function () {
		var rowNumber = Math.floor(($("html").scrollTop() / ($(".main-row tbody tr:first td:first").height() + 2)) - $scope.rowFinderModifier);
		if ($scope.printHelper) {
			console.log($("html").scrollTop(), "/",  $(".main-row tbody tr:first td:first").height() + 2, 
					$("html").scrollTop() / $(".main-row tbody tr:first td:first").height(),
					rowNumber);
		}
		return $scope.findHiddenRowIndex(rowNumber);
	};
	
	$scope.findHiddenRowIndex = function (firstHiddenRow) {
		var index = 0;
		while (firstHiddenRow >= 0) {
			if (!$scope.rowBlank[index]) {
				firstHiddenRow--;
			}
			index++;
		}
		return index;
	};
	
	$scope.save = function () {
		var tableSize = $scope.table.length;
		var compressedTable = [];
		
		for (var i = 0; i < tableSize; i++) {
			if (!$scope.rowBlank[i]) {
				var elements = $scope.getArrayOfElementsOnRow(i);
				compressedTable.push({ row: i, data: elements});
			}
		}
		
		$scope.json = JSON.stringify(compressedTable);
	};
	
	$scope.getArrayOfElementsOnRow = function (rowNumber) {
		var elements = [];
		var row = $scope.table[rowNumber];
		
		for (var i = 0; i < row.length; i++) {
			elements.push(row[i].val);
		}
		return elements;
	};
	
}]);