(function () {
    angular.module('rbApp')
        .controller('formCtrl', formCtrl);
    formCtrl.$inject = ['$timeout', '$scope', '$filter', 'categoryFact', 'itemFact', 'valFormFact'];
    function formCtrl($timeout, $scope, $filter, categoryFact, itemFact, valFormFact) {
        var vm = this;
        vm.err = [];
        vm.item = { name: '', price: null, lunch: false, lunchPrice: null, desc: '', _id: null };
        categoryFact.getCatsDB(function (cats) {
            $timeout(function () {
                vm.cats = $filter('orderBy')(cats, 'pos');
                vm.item.category = vm.cats[0];
            }, 0);
        });
        function clearForm() {
            vm.item = { name: '', price: null, lunch: false, lunchPrice: null, desc: '', category: vm.cats[0], _id: null };
            vm.err = [];
        }
        vm.whichForm = function (form) {
            vm.which = form;
        };
        vm.add = function () {
            newItem = valFormFact(vm.item);
            vm.err = [];
            if (newItem.err.length > 0) {
                for (var err in newItem.err)
                    vm.err.push(newItem.err[err]);
            } else {
                itemFact.putItemDB(newItem.item);
                clearForm();
            }
        };
        vm.clear = function () {
            clearForm();
        };
        vm.edit = function () {
            itemFact.editItem(vm.item);
            clearForm();
        };
        $scope.$on('editItem', function () {
            vm.item = itemFact.getToForm();
            vm.item.category = vm.cats[vm.item.category.pos - 1];
            if (vm.item.lunchPrice === '')
                vm.item.lunch = false;
            else
                vm.item.lunch = true;

        });
    }
})();