window.Appy = angular.module("numberApp", ["LocalStorageModule"]);

Appy.config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix("numbers19");
});

$(function() {
    window.FastClick.attach(document.body);
});

Appy.controller("numberController", ["$scope", "$rootScope", "pairChecker", "historyProvider", "helperService",
    "loadSaveProvider", "expandService", "autoSaveProvider", "localStorageService",
    function($scope, $rootScope, pairChecker, history, helper, loadSave, expand, autoSaveProvider, localStorageService) {
        /*
	 * Algus: 22:30
	 * Valmis 1:30
	 */
        var init = [ {row: 0, data: [1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {row: 1, data: [1, 1, 1, 2, 1, 3, 1, 4, 1]},
            {row: 2, data: [5, 1, 6, 1, 7, 1, 8, 1, 9]}];

        initMode();

        initialize();

        if (!autoSaveProvider.loadSuccess()) {
            loadSave.parseArray(init);
        }

        connectHandlers();

        var updateHelper = function() {
            helper.update();
        };

        function initialize() {
            $rootScope.table = [];
            $rootScope.rowBlank = [];

            $rootScope.helperNums = {};
            $rootScope.firstHiddenRow = 0;
        }

        function connectHandlers() {
            $scope.select = pairChecker.select;

            $scope.restart = function() {
                loadSave.parseArray(init);
                autoSaveProvider.save();
            };

            $scope.expand = function() {
                expand.expand();

                $scope.helperNeeded = true;
                updateHelper();

                autoSaveProvider.save();
            };

            $scope.parse = function() {
                var json = $scope.json;
                loadSave.importTable(json);

                $scope.helperNeeded = true;
                updateHelper();
            };

            $scope.save = function() {
                $scope.json = loadSave.exportTable();
            };

            $scope.undo = history.undo;

            $(window).scroll(function() {
                updateHelper();
                $rootScope.$apply();
            });
        }

        function initMode() {
            if (localStorageService.isSupported) {
                try {
                    $scope.darkMode = localStorageService.get("mode");
                }
                catch (e) {
                    //
                }
            }

            $scope.switchMode = function() {
                $scope.darkMode = !$scope.darkMode;

                if (localStorageService.isSupported) {
                    try {
                        localStorageService.set("mode", $scope.darkMode);
                    }
                    catch (e) {
                        //
                    }
                }
            };
        }
    }]);
