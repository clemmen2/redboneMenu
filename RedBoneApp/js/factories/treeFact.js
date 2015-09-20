(function () {
    angular.module('rbApp')
        .factory('treeFact', treeFact);
    treeFact.$inject = ['$cacheFactory','itemFact'];
    function treeFact($cacheFactory, itemFact) {
        var cache = $cacheFactory('addList');
        var services = {
            toAdd: toAdd,
            getItems: getItems,
            addToList: addToList,
            removeItem: removeItem
        };
        return services;
        function addToList(id) {
            var addedItems = cache.get('addedItems');
            if (!addedItems)
                getItems(function (idc) { addedItems = cache.get('addedItems'); });
            itemFact.getItemsDB(function (itemList) {
                itemList.map(function (intItem) {
                    if (intItem._id == id) {
                        addedItems.push(intItem);
                        cache.put('addedItems', addedItems);
                    }
                });
            });
        }
        function toAdd(id) {
            var addedItems = cache.get('addedItems');
            if (!addedItems)
                getItems(function (idc) { addedItems = cache.get('addedItems'); });
            var alreadyOnList = false;
            if (addedItems.length === 0)
                addToList(id);
            else {
                addedItems.map(function (curItem) {
                    if (curItem._id == id) {
                        alreadyOnList = true;
                    } else {
                        alreadyOnList = false;
                    }
                });
                if (!alreadyOnList)
                    addToList(id);
            }
        }
        function getItems(callback) {
            var addedItems = cache.get('addedItems');
            if (!addedItems) {
                cache.put('addedItems', []);
                callback([]);
            } else
                callback(addedItems);
        }
        function removeItem(id) {
            var addedItems = cache.get('addedItems');
            if (!addedItems)
                getItems(function (idc) { addedItems = cache.get('addedItems'); });
            addedItems = addedItems.filter(function (curItem) {
                if (curItem._id == id) {
                    return false;
                } else {
                    return true;
                }
            });
            cache.put('addedItems', addedItems);
        }
    }
})();