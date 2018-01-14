Appy.factory('autoSaveProvider', ["loadSaveProvider", "localStorageService", function (loadSaveProvider, localStorageService) {

	var scope = {};

	scope.loadSuccess = function () {
		if (localStorageService.isSupported) {
			try {
				var data = localStorageService.get("save");
				loadSaveProvider.importTable(data);
				return true;
			} catch (e) {
				console.log(e);
			}
		}
	}

	scope.save = function (data) {
		if (localStorageService.isSupported) {
			try {
				var stringData = loadSaveProvider.exportTable();
				localStorageService.set("save", stringData);
			} catch (e) {
				console.log(e);
			}
		}
	}

	return scope;
}]);
