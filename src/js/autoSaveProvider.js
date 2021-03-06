Appy.factory("autoSaveProvider", ["loadSaveProvider", "localStorageService", function(loadSaveProvider, localStorageService) {
    var scope = {};

    scope.loadSuccess = function() {
        if (localStorageService.isSupported) {
            try {
                var data = localStorageService.get("save");
                return loadSaveProvider.importTable(data);
            }
            catch (e) {
                // Porn mode, I guess.
            }
        }
    };

    scope.save = function() {
        if (localStorageService.isSupported) {
            try {
                var stringData = loadSaveProvider.exportTable();
                localStorageService.set("save", stringData);
            }
            catch (e) {
                // Porn mode, I guess.
            }
        }
    };

    return scope;
}]);
