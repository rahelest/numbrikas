Appy.factory('expandService', function ($rootScope) {

	var scope = {};

	var expanded = 0;

	scope.expand = function () {
		expanded++;
		var initTable = JSON.parse(JSON.stringify($rootScope.table)); // cloning

		for (var row = 0; row < initTable.length; row++) {
			for (var col = 0; col < initTable[row].data.length; col++) {
				var cell = initTable[row].data[col];
				if (cell.val != "") {
					addToTable(cell.val);
				}
			}
		}
	};

	var addToTable = function (cellValue) {
		var tableLen = $rootScope.table.length;
		var lastRow = $rootScope.table[tableLen - 1];
		var rowNumber = lastRow.number + 1;

		if (lastRow.data.length < 9) {
			lastRow.data.push({val: cellValue, selected: false, row: tableLen - 1, col: lastRow.data.length});
		} else {
			$rootScope.table.push({ number: rowNumber, data: [{val: cellValue, selected: false, row: tableLen, col: 0}]});
		}
	};


	return scope;
});
