(function () {
    angular.module('rbApp')
        .factory('makePdfFact', makePdfFact);
    makePdfFact.$inject = ['$rootScope'];
    function makePdfFact($rootScope){
        var fs = require('fs');
        var path = require('path');
        var userdir = require('userdir');
        var dateformat = require('dateformat');
        var open = require('open');
        var pdfkit = require('pdfkit');
        var services = {
            dinnerPdf: dinnerPdf
        };
        return services;
        function dinnerPdf (menuItems, usePrice, time) {
            var now = new Date();
            var filePath = path.join(userdir, '/Desktop', 'RedboneSetMenus', dateformat(now, "mmm_dd_yyyy"), dateformat(now, "hh_MM") + '.pdf');
            var createPdf = function () {
                var doc = new pdfkit();
                doc.info = {
                    "Title": "RedboneSetMenu_" + dateformat(now, "hh_MM"),
                    "Author": "Red Bone"
                };
                fs.exists(path.resolve(path.parse(filePath).dir, ".."), function (exists) {
                    if (!exists) {
                        fs.mkdirSync(path.resolve(path.parse(filePath).dir, ".."));
                        createPdf();
                    } else {
                        fs.exists(path.parse(filePath).dir, function (exists) {
                            if (!exists) {
                                fs.mkdirSync(path.parse(filePath).dir);
                                createPdf();
                            } else {
                                var i = 0;
                                var mainCats = [];
                                menuItems.map(function (curItem) {
                                    if (mainCats.length === 0) {
                                        mainCats.push(curItem.category.mainCat._id);
                                    } else if (mainCats.indexOf(curItem.category.mainCat._id) == -1){
                                        mainCats.push(curItem.category.mainCat._id);
                                    }
                                });
                                var modSize = 0;
                                var modSpaces = mainCats.length;
                                if (menuItems.length <= 3) {
                                    modSize = 10;
                                    modSpaces = modSpaces + 3;
                                } else if (menuItems.length == 4) {
                                    modSize = 6;
                                    modSpaces = modSpaces + 2;
                                } else if (menuItems.length <= 8) {
                                    modSize = 4;
                                    modSpaces = modSpaces + 1;
                                    if (mainCats.length > 1) {
                                        modSize = modSize - 1;
                                        modSpaces = modSpaces - 1;
                                    }
                                }
                                var neededSpaces = (9 - menuItems.length) - modSpaces;
                                var writeStream = fs.createWriteStream(filePath);
                                doc.pipe(writeStream);
                                doc.roundedRect(50,50,510,700,10)
                                    .stroke();
                                doc.fontSize(25 + modSize)
                                    .text("Welcom To Red Bone Alley", { align: 'center' })
                                    .fontSize(12)
                                    .moveDown()
                                    .moveDown();
                                var mainCatIdsUsed = [];
                                menuItems.map(function (curItem) {
                                    var tempCat = mainCatIdsUsed.filter(function (curCat) {
                                        if (curItem.category.mainCat._id == curCat._id) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if (tempCat.length !== 0) {
                                        if (usePrice && (time == "Dinner" || curItem.lunchPrice === "")) {
                                            doc.fontSize(16 + modSize)
                                                .text(curItem.name + '    ' + curItem.price, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .text(curItem.desc, { align: 'center' })
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                        } else if (usePrice && curItem.lunchPrice !== ""){
                                            doc.fontSize(16 + modSize)
                                                .text(curItem.name + '    ' + curItem.lunchPrice, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .text(curItem.desc, { align: 'center' })
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                        } else {
                                            doc.fontSize(16 + modSize)
                                                .text(curItem.name, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .text(curItem.desc, { align: 'center' })
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                        }
                                    } else {
                                        if (usePrice && (time == "Dinner" || curItem.lunchPrice === "")) {
                                            doc.fontSize(20 + modSize)
                                                .text(curItem.category.mainCat.name, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                            doc.fontSize(16 + modSize)
                                                .text(curItem.name + '    ' + curItem.price, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .text(curItem.desc, { align: 'center' })
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                            mainCatIdsUsed.push(curItem.category.mainCat);
                                        } else if (usePrice && curItem.lunchPrice !== "") {
                                            doc.fontSize(20 + modSize)
                                                .text(curItem.category.mainCat.name, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                            doc.fontSize(16 + modSize)
                                                .text(curItem.name + '    ' + curItem.lunchPrice, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .text(curItem.desc, { align: 'center' })
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                            mainCatIdsUsed.push(curItem.category.mainCat);
                                        } else {
                                            doc.fontSize(20 + modSize)
                                                .text(curItem.category.mainCat.name, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                            doc.fontSize(16 + modSize)
                                                .text(curItem.name, { align: 'center' })
                                                .fontSize(12 + modSize)
                                                .text(curItem.desc, { align: 'center' })
                                                .moveDown();
                                            for (i = 0; i < neededSpaces; i++)
                                                doc.moveDown();
                                            mainCatIdsUsed.push(curItem.category.mainCat);
                                        }
                                    }
                                });
                                doc.end();
                                open(filePath);
                            }
                        });
                    }
                });
            };
            createPdf();
        }
    }
})();
