Appy.factory('loadSaveProvider', function ($rootScope) {
	
	var scope = {};
	
	scope.parseArray = function (data) {
		
		$rootScope.table = [];
		$rootScope.rowBlank = [];
		var rowIndex = 0;
		
//		var previousRowNumber = data[0].row - 1;
		for (var importDataIndex = 0; importDataIndex < data.length; importDataIndex++, rowIndex++) {
			
//			var newRowNumber = data[importDataIndex].row;
//			var rowDifference = newRowNumber - previousRowNumber;
//			if (rowDifference > 1) {
//				console.log("rowDifference", rowDifference);
//				while (rowDifference > 1) {
//					$rootScope.table.push([]);
//					$rootScope.rowBlank.push(true);
//					for (var col = 0; col < 9; col++) {
//						$rootScope.table[rowIndex].push({val: "", selected: false, row: rowIndex, col: col});
//					}
//					rowDifference--;
//					rowIndex++;
//				}
//			}
			
			$rootScope.rowBlank.push(false);
			
			$rootScope.table.push({number: data[importDataIndex].row, data: []});
			var rowArray = data[importDataIndex].data;
			var tableRow = [];
			for (var col = 0; col < rowArray.length; col++) {
				tableRow.push({val: rowArray[col], selected: false, row: rowIndex, col: col});
			}
			
			$rootScope.table[rowIndex].data = tableRow;
			
//			previousRowNumber = newRowNumber;
			
		}
	};
	
	scope.importTable = function (json) {
		if (!json) return;
		
		var parsed = JSON.parse(json);
		scope.parseArray(parsed);
	};
	
	scope.exportTable = function () {
		var tableSize = $rootScope.table.length;
		var compressedTable = [];
		
		for (var i = 0; i < tableSize; i++) {
			if (!$rootScope.rowBlank[i]) {
				compressedTable.push(getArrayOfElementsOnRow(i));
			}
		}
		
		return JSON.stringify(compressedTable);
	};
	
	var getArrayOfElementsOnRow = function (rowNumber) {
		var elements = [];
		var row = $rootScope.table[rowNumber];
		
		for (var i = 0; i < row.data.length; i++) {
			elements.push(row.data[i].val);
		}
		
		var rowObject = { row: row.number, data: elements};
		return rowObject;
	};
	
	
	return scope;
});