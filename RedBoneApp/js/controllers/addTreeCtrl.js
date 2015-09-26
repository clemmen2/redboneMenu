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
            if (!vm.useMod)
                vm.onChange();
            var pdfFormat = {
                menu: $filter('orderBy')(vm.items, 'category.mainCat.pos'),
                showPrice: vm.price,
                time: vm.time,
                neededSpaces: vm.neededSpaces,
                modSize: vm.modSize
            };
            makePdfFact.dinnerPdf(pdfFormat);
        };
        vm.onChange = function () {
            var mainCats = [];
            vm.items.map(function (curItem) {
                if (mainCats.length === 0) {
                    mainCats.push(curItem.category.mainCat._id);
                } else if (mainCats.indexOf(curItem.category.mainCat._id) == -1) {
                    mainCats.push(curItem.category.mainCat._id);
                }
            });
            vm.modSize = 0;
            var modSpaces = mainCats.length;
            if (vm.items.length <= 3) {
                vm.modSize = 10;
                modSpaces = modSpaces + 3;
            } else if (vm.items.length == 4) {
                vm.modSize = 6;
                modSpaces = modSpaces + 2;
            } else if (vm.items.length <= 8) {
                vm.modSize = 4;
                modSpaces = modSpaces + 1;
                if (mainCats.length > 1) {
                    vm.modSize = vm.modSize - 1;
                    modSpaces = modSpaces - 1;
                }
            }
            vm.neededSpaces = (9 - vm.items.length) - modSpaces;
        }
    }
})();