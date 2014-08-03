Appy.factory('historyProvider', ['variableProvider',  function (variables) {
	
	var scope = {};
	
	var history = [];
	var historyStep = [];
	
	scope.startStep = function (cell1, cell2) {
		historyStep = [makeHistoryObject(cell1), makeHistoryObject(cell2)];
	};
	
	scope.setBlankVar = function (i, value) {
		historyStep[i].isMadeBlank = value;
	};
	
	scope.ready = function () {
		history.push(historyStep);
		
		if (history.length > 10) {
			history.shift();
		}
	};
	
	var makeHistoryObject = function (cell) {
		return {cell: cell, val: cell.val, isMadeBlank: null};
	};
	
	scope.undo = function () {
		var step = history.pop();
		if (step) {
		
			for (var i = 0; i < step.length; i++) {
				var cell = step[i].cell;
				cell.val = step[i].val;
				var row = cell.row;
				if (step[i].isMadeBlank) {
					variables.rowBlank[row] = false;
				}
			}
		}
	};
	
	
	return scope;
}]);