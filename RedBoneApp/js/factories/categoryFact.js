(function () {
    angular.module('rbApp')
        .factory('categoryFact', categoryFact);
    categoryFact.$inject = ['$cacheFactory'];
    function categoryFact($cacheFactory) {
        var fs = require('fs');
        var parse = require('csv-parse');
        var path = require('path');
        var cache = $cacheFactory('catCache');
        var services = {
            getCatsDB: getCatsDB,
            getMainCatsDB: getMainCatsDB
        }
        return services
        function getCatsDB(callback) {
            var cats = cache.get('categories');
            var mainCats = cache.get('mainCategories');
            if (!mainCats)
                getMainCatsDB(function (mc) { mainCats = cache.get('mainCategories'); });
            if (!cats) {
                rs = fs.createReadStream(path.resolve(process.cwd() + '/data/cat.txt'));
                parser = parse({ columns: true, delimiter: '\t' }, function (err, data) {
                    cats = data;
                    cats = cats.map(function (cat) {
                        cat.mainCat = mainCats.filter(function (mainCat) {
                            if (mainCat._id == cat.mainCatId)
                                return true;
                            else
                                return false;
                        })[0];
                        return cat;
                    });
                    cache.put('categories', cats);
                    callback(cats);
                });
                rs.pipe(parser);
            } else {
                callback(cats);
            }
        };
        function getMainCatsDB(callback) {
            var mainCats = cache.get('mainCategories');
            if (!mainCats) {
                rs = fs.createReadStream(path.resolve(process.cwd() + '/data/mainCat.txt'));
                parser = parse({ columns: true, delimiter: '\t' }, function (err, data) {
                    mainCats = data;
                    cache.put('mainCategories', mainCats);
                    callback(mainCats);
                });
                rs.pipe(parser);
            } else {
                callback(mainCats);
            }
        };
    }
})();