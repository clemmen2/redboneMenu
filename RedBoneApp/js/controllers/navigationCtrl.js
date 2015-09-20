(function () {
    angular.module('rbApp')
        .controller('navigationCtrl', navigationCtrl);
    navigationCtrl.$inject = [];
    function navigationCtrl() {
        var vm = this;
        var gui = require('nw.gui');
        var win = gui.Window.get();
        win.isMax = false;
        vm.index = 1;
        vm.setPage = function (index) {
            vm.index = index;
        };
        vm.winMin = function () {
            win.minimize();
        };
        vm.winClose = function () {
            win.close();
        };
        vm.winMax = function () {
            if (win.isMax)
                win.unmaximize();
            else
                win.maximize();
        };
        win.on('maximize', function () {
            win.isMax = true;
        });
        win.on('unmaximize', function () {
            win.isMax = false;
        });
    }
})();