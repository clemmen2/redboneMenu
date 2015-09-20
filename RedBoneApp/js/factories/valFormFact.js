(function () {
    angular.module('rbApp')
        .factory('valFormFact', valFormFact);
    valFormFact.$inject = ['regexpConst'];
    function valFormFact(regexpConst) {
        return function (item) {
            var err = [];
            var errFrom = 'valForm';
            function createError(msg) {
                err.push({ from: errFrom, error: msg });
            }
            if (item.name === '') {
                createError('Please supply a name for the item.');
            } else if (!regexpConst.NAME.test(item.name)) {
                createError('Please supply a vaild name for the item.');
            }
            if (item.category.name != 'Dressing') {
                if (item.price === '') {
                    createError('Please supply a price for the item.');
                } else {
                    if (!regexpConst.NUM.test(item.price)) {
                        createError('Please supply a valid price for the item.');
                    } else {
                        priceArray = regexpConst.FILTERNUM.exec(item.price);
                        item.price = priceArray[1];
                    }
                }
                if (item.desc === '')
                    createError('Please supply a description for the item.');
                if (item.lunch !== false) {
                    if (item.lunchPrice === '') {
                        createError('Please supply a lunch price for the item.');
                    } else if (!regexpConst.NUM.test(item.lunchPrice)) {
                        createError('Please supply a valid lunch price for the item.');
                    } else {
                        priceArray = regexpConst.FILTERNUM.exec(item.lunchPrice);
                        item.lunchPrice = priceArray[1];
                    }
                }
            } else {
                item.price = '';
                item.desc = '';
                item.lunch = false;
                item.lunchPrice = '';
            }
            return { err: err, item: item };
        };
    }
})();