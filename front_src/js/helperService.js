Appy.factory('helperService', function ($rootScope) {
	
	var scope = {};
	scope.rowFinderModifier = 2.2;
	scope.printHelper = false;
	
	scope.update = function () {
		var firstHiddenRow = findFirstHiddenRow();
		$rootScope.firstHiddenRowNumber = $rootScope.table[firstHiddenRow].number;
		for (var i = 0; i < 9; i++) {
			var activeRow = firstHiddenRow;
			var foundNumber = "";
			
			while (activeRow >= 0 && !foundNumber) {
				foundNumber = $rootScope.table[activeRow].data[i].val;
				activeRow--;
			}
			
			$rootScope.helperNums[i] = foundNumber;
		}
	};
	
	var findFirstHiddenRow = function () {
		var html = $("html");
		var firstCell = $(".main-row tbody tr:first td:first");
		
		var rowNumber = Math.floor(($("html").scrollTop() / (firstCell.height() + 3)) - scope.rowFinderModifier);
		if (scope.printHelper) {
			console.log($("html").scrollTop(), "/",  firstCell.height() + 3, 
					html.scrollTop() / firstCell.height(),
					rowNumber);
		}
		return findHiddenRowIndex(rowNumber);
	};
	
	var findHiddenRowIndex = function (firstHiddenRow) {
		var index = 0;
		while (firstHiddenRow >= 0) {
			if (!$rootScope.rowBlank[index]) {
				firstHiddenRow--;
			}
			index++;
		}
		return index;
	};
	
	return scope;
});