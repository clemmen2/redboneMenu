angular.module('appServices',[])
.service('category',[function(){
	var category = {};
	var fs = require('fs');
	var parse = require('csv-parse');
	var path = require('path');
	var cats=[];
	var mainCats= [];
	category.getCatsDB = function(callback){
		category.getMainCatsDB(function(mainCats){});
		if(cats.length === 0){
			rs = fs.createReadStream(path.resolve(process.cwd()+'/data/cat.txt'));
			parser = parse({columns: true,delimiter: '\t'}, function(err,data){
				cats = data;
				cats = cats.map(function(cat){
					cat.mainCat = mainCats.filter(function(mainCat){
						if (mainCat._id == cat.mainCatId)
							return true;
						else
							return false;
					})[0];
					return cat;
				});
				callback(cats);
			});
			rs.pipe(parser);
		}else{
			callback(cats);
		}
	};
	category.getMainCatsDB = function(callback){
		if(mainCats.length === 0){
			rs = fs.createReadStream(path.resolve(process.cwd()+'/data/mainCat.txt'));
			parser = parse({columns: true,delimiter: '\t'}, function(err,data){
				mainCats = data;
				callback(mainCats);
			});
			rs.pipe(parser);
		}else{
			callback(mainCats);
		}
	};
	return category;
}])
.service('item',['$rootScope', 'category', function($rootScope, category){
	var fs = require('fs');
	var parse = require('csv-parse');
	var path = require('path');
	var itemFunc = {};
	var item={};
	var items = [];
	itemFunc.getItemsDB = function(callback){
		category.getCatsDB(function(c){
			var cats = c;
			if(items.length === 0){
				rs = fs.createReadStream(path.resolve(process.cwd()+'/data/menuItems.txt'));
				parser = parse({columns: true,delimiter: '\t'}, function(err,data){
					items = data;
					items = items.map(function(it){
						it.category = cats.filter(function(cat){
							if (it.catId == cat._id)
								return true;
							else
								return false;
						})[0];
						return it;
					});
					callback(items);
				});
				rs.pipe(parser);
			}else{
				callback(items);
			}
		});
	};
	itemFunc.putItemDB = function(item){
		itemFunc.getItemsDB(function(idc){
			item._id = '0';
			item._id = String(parseInt(items.reduce(function(prev,curr){
				if (parseInt(prev._id) < parseInt(curr._id)){
					return curr;
				}else{
					return prev;
				}
			})._id)+1);
			if (item.lunchPrice === null)
				item.lunchPrice = '';
			if (item.price === null)
				item.price = '';
			itemString = item._id+'\t'+item.name+'\t'+item.price+'\t'+item.desc+'\t'+item.category._id+'\t'+item.lunchPrice+'\r\n';
			fs.appendFile(path.resolve(process.cwd()+'/data/menuItems.txt'),itemString,function(err){});
			items.push(item);
		});
	};
	itemFunc.getToForm = function(){
		return item;
	};
	itemFunc.toForm = function(id){
		items.map(function(intItem){
			if (intItem._id == id){
				item = intItem;
				$rootScope.$broadcast('editItem');
			}
		});
	};
	itemFunc.removeItem = function(id){
		fs.readFile(path.resolve(process.cwd()+'/data/menuItems.txt'),{encoding:'utf8'},function(err,data){
			var lines = data.split('\r\n');
			var file = lines.filter(function(line){
				var item = line.split('\t');
				if(item[0] == id)
					return false;
				else
					return true;
			}).join('\r\n');
			fs.writeFile(path.resolve(process.cwd()+'/data/menuItems.txt'),file,function(e){});
		});
		items = items.filter(function(item){
			if (item._id == id)
				return false;
			else
				return true;
		});
	};
	itemFunc.editItem = function(intItem){
		fs.readFile(path.resolve(process.cwd()+'/data/menuItems.txt'),{encoding:'utf8'},function(err,data){
			var lines = data.split('\r\n');
			var file = lines.map(function(line){
				var item = line.split('\t');
				if(item[0] == intItem._id)
					itemString = intItem._id+'\t'+intItem.name+'\t'+intItem.price+'\t'+intItem.desc+'\t'+intItem.category._id+'\t'+intItem.lunchPrice;
					
				else
					itemString = line;
				return itemString;
			}).join('\r\n');
			fs.writeFile(path.resolve(process.cwd()+'/data/menuItems.txt'),file,function(e){});
		});
		items = items.map(function(item){
			if (item._id == intItem._id)
				return intItem;
			else
				return item;
		});
	};
	return itemFunc;
}])
.factory('valForm',[function(){
	return function(item){
		var err = [];
		var errFrom = 'valForm';
		var numRegExp = /^\d*\.?\d*$/;
		var filterNumRegExp = /(\d*\.[0-9][1-9]|\d*\.[1-9]{1,2}|\d*)/;
		var nameRegExp = /^[a-z A-Z]*$/;
		function createError(msg){
			err.push({from:errFrom, error:msg});
		}
		if (item.name === ''){
			createError('Please supply a name for the item.');
		}else if (!nameRegExp.test(item.name)){
			createError('Please supply a vaild name for the item.');
		}
		if (item.category.name != 'Dressing'){
			if (item.price === ''){
				createError('Please supply a price for the item.');
			}else{
				if(!numRegExp.test(item.price)){
					createError('Please supply a valid price for the item.');
				}else{
					priceArray = filterNumRegExp.exec(item.price);
					item.price = priceArray[1];
				}
			}
			if (item.desc === '')
				createError('Please supply a description for the item.');
			if (item.lunch !== false){
				if (item.lunchPrice === ''){
					createError('Please supply a lunch price for the item.');
				}else if(!numRegExp.test(item.lunchPrice)){
					createError('Please supply a valid lunch price for the item.');
				}else{
					priceArray = filterNumRegExp.exec(item.lunchPrice);
					item.lunchPrice = priceArray[1];
				}
			}
		}else{
			item.price = '';
			item.desc = '';
			item.lunch = false;
			item.lunchPrice = '';
		}
		return {err: err, item: item};
	};
}])
.service('tree',['item', function(items){
	var treeFunc = {};
	var addedItems = [];
	var addToList = function(id){
		items.getItemsDB(function(itemList){
			itemList.map(function(intItem){
				if (intItem._id == id){
					addedItems.push(intItem);
				}
			});
		});
	};
	treeFunc.toAdd = function(id){
		alreadyOnList = false;
		addedItems.map(function(curItem){
			if (curItem._id == id){
				alreadyOnList = true;
			}else{
				alreadyOnList = false;
			}
		});
		if (addedItems.length === 0){
			addToList(id);
		}else if(alreadyOnList){
			console.log('Already on List');
		}else{
			addToList(id);
		}
	};
	treeFunc.getItems = function(callback){
		callback(addedItems);
	};
	treeFunc.removeItem = function(id){
		addedItems = addedItems.filter(function(curItem){
			if(curItem._id == id){
				return false;
			}else{
				return true;
			}
		});
	};
	return treeFunc;
}])
.factory('makePdf',['$rootScope', function($rootScope){
	var fs = require('fs');
	var path = require('path');
	var userdir = require('userdir');
	var dateformat = require('dateformat');
	var open = require('open');
	var pdfkit = require('pdfkit');
	return function(menuItems, usePrice){
		var now = new Date();
		var filePath = path.join(userdir,'/Desktop','RedboneSetMenus',dateformat(now, "mmm_dd_yyyy"),dateformat(now, "hh_MM")+'.pdf'); 
		var createPdf = function(){
			var doc = new pdfkit();
			doc.info = {
				"Title": "RedboneSetMenu_"+dateformat(now, "hh_MM"),
				"Author": "Red Bone"
			};
			fs.exists(path.resolve(path.parse(filePath).dir, ".."),function(exists){
				if (!exists){
					fs.mkdirSync(path.resolve(path.parse(filePath).dir, ".."));
					createPdf();
				}else{
					fs.exists(path.parse(filePath).dir,function(exists){
						if (!exists){
							fs.mkdirSync(path.parse(filePath).dir);
							createPdf();
						}else{
							var writeStream = fs.createWriteStream(filePath);
							doc.pipe(writeStream);
							doc.fontSize(25)
								.text("Red Bone Alley",{align:'center'})
								.fontSize(12)
								.moveDown();
							var mainCatIdsUsed = [];
							menuItems.map(function(curItem){
								tempCat = mainCatIdsUsed.filter(function(curCat){
									if (curItem.category.mainCat._id == curCat._id) {
										return true;
									}else{
										return false;
									}
								});
								console.log(tempCat);
								if (tempCat.length !== 0){
									if (usePrice){
										doc.fontSize(16)
											.text(curItem.name+'    '+curItem.price,{align:'center'})
											.fontSize(12)
											.text(curItem.desc,{align:'center'})
											.moveDown();
									}else{
										doc.fontSize(16)
											.text(curItem.name,{align:'center'})
											.fontSize(12)
											.text(curItem.desc,{align:'center'})
											.moveDown();
									}
								}else{
									if(usePrice){
										doc.fontSize(20)
											.text(curItem.category.mainCat.name,{align:'center'})
											.fontSize(12)
											.moveDown();
										doc.fontSize(16)
											.text(curItem.name+'    '+curItem.price,{align:'center'})
											.fontSize(12)
											.text(curItem.desc,{align:'center'})
											.moveDown();
										mainCatIdsUsed.push(curItem.category.mainCat);
									}else{
										doc.fontSize(20)
											.text(curItem.category.mainCat.name,{align:'center'})
											.fontSize(12)
											.moveDown();
										doc.fontSize(16)
											.text(curItem.name,{align:'center'})
											.fontSize(12)
											.text(curItem.desc,{align:'center'})
											.moveDown();
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
	};
}])
;
