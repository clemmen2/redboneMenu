(function () {
    angular.module('rbApp')
        .controller('treeCtrl', treeCtrl);
    treeCtrl.$inject = ['$filter', '$routeParams', '$window', 'categoryFact', 'itemFact', 'treeFact'];
    function treeCtrl($filter, $routeParams, $window, categoryFact, itemFact, treeFact) {
        var vm = this;
        var id;
        vm.delName = '';
        categoryFact.getCatsDB(function (cats) {
            vm.cats = $filter('orderBy')(cats, 'mainCat.pos');
        });
        itemFact.getItemsDB(function (its) {
            vm.items = its;
        });
        vm.catId = $routeParams.catId;
        vm.removeItem = function () {
            itemFact.removeItem(id);
            itemFact.getItemsDB(function (items) {
                vm.items = items;
            });
        };
        vm.set = function (item) {
            id = item._id;
            vm.delName = item.name;
        };
        vm.addToForm = function (id) {
            itemFact.toForm(id);
        };
        vm.addToTree = function (id) {
            treeFact.toAdd(id);
        };
    }
})();