Appy.factory("pairChecker", ["historyProvider", "helperService", "autoSaveProvider", function(history, helper, autoSaveProvider) {
    var scope = {};

    var selectedCells = [];

    scope.select = function(event, cell, table, rowBlank) {
        event.preventDefault();
        event.stopPropagation();

        cell.selected = !cell.selected;
        var len;

        if (cell.selected) {
            len = selectedCells.length;
            if (len == 0) {
                selectedCells.push(cell);
            }
            else if (len == 1) {
                selectedCells.push(cell);
                if (checkSelected(table, rowBlank)) {
                    removeSelected(table, rowBlank);
                }
                unSelectSelected();
            }
        }
        else {
            len = selectedCells.length;
            if (len == 1) {
                selectedCells = [];
            }
            else {
                // console.log("KUIDAS?? selectedCells.len != 1");
            }
        }

        helper.update();
        autoSaveProvider.save();
    };

    function checkSelected(table, rowBlank) {
        // kohakuti, k�rvuti

        var cell1 = selectedCells[0];
        var cell2 = selectedCells[1];

        if (!valuesOK()) {
            return false;
        }

        if (cell1.row == cell2.row && Math.abs(cell1.col - cell2.col) == 1) {
            return true;
        }
        else if (cell1.col == cell2.col &&
				Math.abs(cell1.row - cell2.row) == 1) {
            return true;
        }
        else if (verticallyOK(table, rowBlank) || horizontallyOK(table, rowBlank)) {
            return true;
        }
        else {
            return false;
        }
    }

    function valuesOK() {
        var cell1 = selectedCells[0];
        var cell2 = selectedCells[1];

        if (cell1 === "" || cell2 === "") {return false;}

        return (cell1.val == cell2.val || cell1.val + cell2.val == 10);
    }

    function verticallyOK(table) {
        // kohakuti juba �ra olnud

        var cell1 = selectedCells[0];
        var cell2 = selectedCells[1];

        if (cell1.col != cell2.col) {
            return false;
        }

        if (cell1.row > cell2.row) { // �levalpool olev esimeseks
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
    }

    function horizontallyOK(table, rowBlank) {
        // k�rvuti on juba �ra olnud

        var cell1 = selectedCells[0];
        var cell2 = selectedCells[1];

        if (cell1.row > cell2.row ||
				(cell1.row == cell2.row && cell1.col > cell2.col)) {
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
        }
        else {
            // erinevatel ridadel
            if (cell2.row - cell1.row > 1) {
                // kaugemal kui kohakuti read
                for (var currentRow = cell1.row + 1; currentRow < cell2.row; currentRow++) {
                    if (!rowBlank[currentRow]) {
                        // antud rida ei ole t�hi
                        return false;
                    }
                }
            }

            var cell1Row = cell1.row;
            for (var currentCol = cell1.col + 1; currentCol < 9; currentCol++) {
                var currentCell = table[cell1Row].data[currentCol];
                if (currentCell.val != "") {
                    return false;
                }
            }

            var cell2Row = cell2.row;
            for (var cell2Col = 0; cell2Col < cell2.col; cell2Col++) {
                var cellData = table[cell2Row].data[cell2Col];
                if (cellData.val != "") {
                    return false;
                }
            }
        }

        return true;
    }

    function removeSelected(table, rowBlank) {
        var cell1 = selectedCells[0];
        var cell2 = selectedCells[1];

        history.startStep(cell1, cell2);

        cell1.val = "";
        cell2.val = "";

        var rows = [ cell1.row, cell2.row ];

        for (var i = 0; i < 2; i++) {
            var row = table[rows[i]].data;
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
    }

    function unSelectSelected() {
        selectedCells[0].selected = false;
        selectedCells[1].selected = false;
        selectedCells = [];
    }

    return scope;
}]);
