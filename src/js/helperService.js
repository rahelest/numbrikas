Appy.factory("helperService", function($rootScope) {
    var scope = {};
    scope.rowFinderModifier = 1.3;

    scope.update = function() {
        var firstHiddenRow = findFirstHiddenRow();

        for (var i = 0; i < 9; i++) {
            var activeRow = firstHiddenRow;
            var foundNumber = "";

            if ($rootScope.table.length < activeRow) {
                return;
            }

            while (activeRow >= 0 && !foundNumber) {
                foundNumber = $rootScope.table[activeRow].data[i].val;
                activeRow--;
            }

            $rootScope.helperNums[i] = foundNumber;
        }
    };

    function findFirstHiddenRow() {
        var firstCell = $(".main-row tbody tr:first td:first");
        var rowNumber = Math.floor(($("html").scrollTop() / (firstCell.height() + 3)) - scope.rowFinderModifier);
        return findHiddenRowIndex(rowNumber);
    }

    function findHiddenRowIndex(firstHiddenRow) {
        var index = 0;
        while (firstHiddenRow >= 0) {
            if (!$rootScope.rowBlank[index]) {
                firstHiddenRow--;
            }
            index++;
        }
        return index;
    }

    return scope;
});
