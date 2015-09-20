(function () {
    angular.module('rbApp')
        .factory('itemFact',itemFact);
    itemFact.$inject = ['$rootScope', '$cacheFactory', 'categoryFact'];
    function itemFact($rootScope,$cacheFactory,categoryFact) {
        var fs = require('fs');
        var parse = require('csv-parse');
        var path = require('path');
        var services = {
            getItemsDB: getItemsDB,
            putItemDB: putItemDB,
            getToForm: getToForm,
            toForm: toForm,
            removeItem: removeItem,
            editItem: editItem
        };
        var cache = $cacheFactory('itemCache');
        return services;
        function getItemsDB(callback) {
            var items = cache.get('items');
            categoryFact.getCatsDB(function (cats) {
                if (!items) {
                    rs = fs.createReadStream(path.resolve(process.cwd() + '/data/menuItems.txt'));
                    parser = parse({ columns: true, delimiter: '\t' }, function (err, data) {
                        items = data;
                        items = items.map(function (it) {
                            it.category = cats.filter(function (cat) {
                                if (it.catId == cat._id)
                                    return true;
                                else
                                    return false;
                            })[0];
                            return it;
                        });
                        cache.put('items', items);
                        callback(items);
                    });
                    rs.pipe(parser);
                } else {
                    callback(items);
                }
            });
        }
        function putItemDB(item) {
            var items = cache.get('items');
            if (!items)
                getItemsDB(function (idc) { items = cache.get('items'); });
            item._id = '0';
            item._id = String(parseInt(items.reduce(function (prev, curr) {
                if (parseInt(prev._id) < parseInt(curr._id)) {
                    return curr;
                } else {
                    return prev;
                }
            })._id) + 1);
            if (item.lunchPrice === null)
                item.lunchPrice = '';
            if (item.price === null)
                item.price = '';
            itemString = item._id + '\t' + item.name + '\t' + item.price + '\t' + item.desc + '\t' + item.category._id + '\t' + item.lunchPrice + '\r\n';
            fs.appendFile(path.resolve(process.cwd() + '/data/menuItems.txt'), itemString, function (err) { });
            items.push(item);
            cache.put('items', items);
            
        }
        function getToForm() {
            var item = cache.get('item');
            if (!item)
                return null;
            return item;
        }
        function toForm(id) {
            var items = cache.get('items');
            if (!items)
                getItemsDB(function (idc) { items = cache.get('items'); });
            items.map(function (intItem) {
                if (intItem._id == id) {
                    cache.put('item', intItem);
                    $rootScope.$broadcast('editItem');
                }
            });
        }
        function removeItem(id) {
            var items = cache.get('items');
            if (!items)
                getItemsDB(function (idc) { items = cache.get('items'); });
            fs.readFile(path.resolve(process.cwd() + '/data/menuItems.txt'), { encoding: 'utf8' }, function (err, data) {
                var lines = data.split('\r\n');
                var file = lines.filter(function (line) {
                    var item = line.split('\t');
                    if (item[0] == id)
                        return false;
                    else
                        return true;
                }).join('\r\n');
                fs.writeFile(path.resolve(process.cwd() + '/data/menuItems.txt'), file, function (e) { });
            });
            items = items.filter(function (item) {
                if (item._id == id)
                    return false;
                else
                    return true;
            });
            cache.put('items', items);
        }
        function editItem(intItem) {
            var items = cache.get('items');
            if (!items)
                getItemsDB(function (idc) { items = cache.get('items'); });
            fs.readFile(path.resolve(process.cwd() + '/data/menuItems.txt'), { encoding: 'utf8' }, function (err, data) {
                var lines = data.split('\r\n');
                var file = lines.map(function (line) {
                    var item = line.split('\t');
                    if (item[0] == intItem._id)
                        itemString = intItem._id + '\t' + intItem.name + '\t' + intItem.price + '\t' + intItem.desc + '\t' + intItem.category._id + '\t' + intItem.lunchPrice;

                    else
                        itemString = line;
                    return itemString;
                }).join('\r\n');
                fs.writeFile(path.resolve(process.cwd() + '/data/menuItems.txt'), file, function (e) { });
            });
            items = items.map(function (item) {
                if (item._id == intItem._id)
                    return intItem;
                else
                    return item;
            });
            cache.put('items', items);
        }
    }
})();