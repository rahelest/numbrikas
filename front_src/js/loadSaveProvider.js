Appy.factory('loadSaveProvider', function ($rootScope) {
	
	var scope = {};
	
	scope.parseArray = function (data) {
		
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
				var elements = getArrayOfElementsOnRow(i);
				compressedTable.push({ row: i, data: elements});
			}
		}
		
		return JSON.stringify(compressedTable);
	};
	
	var getArrayOfElementsOnRow = function (rowNumber) {
		var elements = [];
		var row = $rootScope.table[rowNumber];
		
		for (var i = 0; i < row.length; i++) {
			elements.push(row[i].val);
		}
		return elements;
	};
	
	
	return scope;
});