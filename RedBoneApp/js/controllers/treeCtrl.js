(function () {
    angular.module('rbApp')
        .controller('treeCtrl', treeCtrl);
    treeCtrl.$inject = ['$filter', '$routeParams', 'categoryFact', 'itemFact', 'treeFact'];
    function treeCtrl($filter, $routeParams, categoryFact, itemFact, treeFact) {
        var vm = this;
        categoryFact.getCatsDB(function (cats) {
            vm.cats = $filter('orderBy')(cats, 'mainCat.pos');
        });
        itemFact.getItemsDB(function (its) {
            vm.items = its;
        });
        vm.catId = $routeParams.catId;
        vm.removeItem = function (id) {
            itemFact.removeItem(id);
            itemFact.getItemsDB(function (items) {
                vm.items = items;
            });
        };
        vm.addToForm = function (id) {
            itemFact.toForm(id);
        };
        vm.addToTree = function (id) {
            treeFact.toAdd(id);
        };
    }
})();