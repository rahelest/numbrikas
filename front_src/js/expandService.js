Appy.factory('expandService', function ($rootScope) {
	
	var scope = {};
	
	var expanded = 0;
	
	scope.expand = function () {
		expanded++;
		var initTable = JSON.parse(JSON.stringify($rootScope.table)); // cloning
		
		for (var row = 0; row < initTable.length; row++) {
			for (var col = 0; col < initTable[row].length; col++) {
				var cell = initTable[row][col];
				if (cell.val != "") {
					addToTable(cell.val);
				}
			}
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
	
	
	return scope;
});