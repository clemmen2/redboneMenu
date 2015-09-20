(function () {
    angular.module('rbApp')
        .controller('addTreeCtrl', addTreeCtrl);
    addTreeCtrl.$inject = ['$scope', '$filter', 'treeFact', 'makePdfFact'];
    function addTreeCtrl($scope, $filter, treeFact, makePdfFact) {
        var vm = this;
        vm.price = true;
        vm.time = "Dinner";
        treeFact.getItems(function (items) {
            vm.items = items;
        });
        vm.priceTog = function () {
            if (vm.price === true)
                vm.price = false;
            else
                vm.price = true;
        };
        vm.timeTog = function () {
            if (vm.time == "Dinner")
                vm.time = "Lunch";
            else
                vm.time = "Dinner";
        };
        vm.remove = function (id) {
            treeFact.removeItem(id);
            treeFact.getItems(function (items) {
                vm.items = items;
            });
        };
        vm.save = function () {
            var tomenu = $filter('orderBy')(vm.items, 'category.mainCat.pos');
            makePdfFact.dinnerPdf(tomenu, vm.price, vm.time);
        };
    }
})();