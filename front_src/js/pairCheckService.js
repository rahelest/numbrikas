Appy.factory('pairChecker', ['historyProvider', 'helperService', function (history, helper) {

	var scope = {};

	var selectedCells = [];

	scope.select = function (cell, table, rowBlank) {
		cell.selected = !cell.selected;

		if (cell.selected) {
			var len = selectedCells.length;
			if (len == 0) {
				selectedCells.push(cell);
			} else if (len == 1) {
				selectedCells.push(cell);
				if (checkSelected(table, rowBlank)) {
					removeSelected(table, rowBlank);
				}
				unSelectSelected();
			}
		} else {
			var len = selectedCells.length;
			if (len == 1) {
				selectedCells = [];
			} else {
				// console.log("KUIDAS?? selectedCells.len != 1");
			}
		}
		
		helper.update();
	};

	var checkSelected = function (table, rowBlank) {
		// kohakuti, kõrvuti

		var cell1 = selectedCells[0];
		var cell2 = selectedCells[1];

		if (!valuesOK()) {
			return false;
		}

		if (cell1.row == cell2.row && Math.abs(cell1.col - cell2.col) == 1) {
			return true;
		} else if (cell1.col == cell2.col
				&& Math.abs(cell1.row - cell2.row) == 1) {
			return true;
		} else if (verticallyOK(table, rowBlank) || horizontallyOK(table, rowBlank)) {
			return true;
		} else {
			return false;
		}

	};

	var valuesOK = function () {
		var cell1 = selectedCells[0];
		var cell2 = selectedCells[1];

		if (cell1 === "" || cell2 === "")
			return false;

		return (cell1.val == cell2.val || cell1.val + cell2.val == 10);
	};

	var verticallyOK = function (table, rowBlank) {
		// kohakuti juba ära olnud

		var cell1 = selectedCells[0];
		var cell2 = selectedCells[1];

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
			var cell = table[row].data[col];
			if (cell.val != "") {
				return false;
			}
		}
		return true;
	};

	var horizontallyOK = function (table, rowBlank) {
		// kõrvuti on juba ära olnud

		var cell1 = selectedCells[0];
		var cell2 = selectedCells[1];

		if (cell1.row > cell2.row
				|| (cell1.row == cell2.row && cell1.col > cell2.col)) {
			var temp = cell1;
			cell1 = cell2;
			cell2 = temp;
		}

		var row = cell1.row;
		if (cell1.row == cell2.row) {
			for (var col = cell1.col + 1; col < cell2.col; col++) {
				var cell = table[row].data[col];
				if (cell.val != "") {
					return false;
				}
			}
		} else {
			// erinevatel ridadel
			if (cell2.row - cell1.row > 1) {
				// kaugemal kui kohakuti read
				for (var row = cell1.row + 1; row < cell2.row; row++) {
					if (!rowBlank[row]) {
						// antud rida ei ole tühi
						return false;
					}
				}
			}

			var row = cell1.row;
			for (var col = cell1.col + 1; col < 9; col++) {
				var cell = table[row].data[col];
				if (cell.val != "") {
					return false;
				}
			}

			row = cell2.row;
			for (var col = 0; col < cell2.col; col++) {
				var cell = table[row].data[col];
				if (cell.val != "") {
					return false;
				}
			}
		}

		return true;

	};

	var removeSelected = function (table, rowBlank) {

		var cell1 = selectedCells[0];
		var cell2 = selectedCells[1];

		history.startStep(cell1, cell2);

		cell1.val = "";
		cell2.val = "";

		var rows = [ cell1.row, cell2.row ];

		for (var i = 0; i < 2; i++) {
			var row = table[rows[i]];
			var valueFound = false;
			
			for (var col = 0; col < 9; col++) {
				if (!row[col] || row[col].val != "") {
					valueFound = true;
					break;
				}
			}

			rowBlank[rows[i]] = !valueFound;
			history.setBlankVar(i, !valueFound);
		}

		history.ready();
	};

	var unSelectSelected = function () {
		selectedCells[0].selected = false;
		selectedCells[1].selected = false;
		selectedCells = [];
	};

	return scope;

}]);