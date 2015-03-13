angular.module('appServices',[])

	.service('Cat', ['$rootScope', function($rootScope){
		var mainCatList = [];
		var CatList = [];
		var addMainCat = function(cat){
			for (var obj in cat) {
				mainCatList.push(cat[obj]);
			}
		};
		var getMainCat = function(){
			return mainCatList;
		};
		var addCat = function(cat){
			for (var obj in cat){
				CatList.push(cat[obj]);
			}
		};
		var getCat = function(){
			return CatList;
		};
		var remCat = function(id, callback){
			var newCatList=[];
			for (var obj in CatList){
				if (CatList[obj]._id != id){
					newCatList.push(CatList[obj]);
				}
			}
			CatList = newCatList;
			callback();
		};
		var getMainCatDB = function(serv,backup) {
			$rootScope.dbCat.find({mainCat:{$exists: false}}).sort({pos: 1}).exec(function(err, docs){
				if(docs.length === 0){
					docs.push({name: 'Appetizers', pos: 1});
					docs.push({name: 'Entrees', pos: 2});
					docs.push({name: 'Desserts', pos: 3});
					docs.push({name: 'Dressing', pos: 4});
					backup(docs);
				}
				serv(docs);
			});
		};
		var getCatDB = function(serv) {
			$rootScope.dbCat.find({mainCat:{$exists: true}}).sort({'mainCat.pos' : 1}).exec(function(err, docs){
				serv(docs);
			});
		};
		var addCatDB = function(item,serv){
			$rootScope.dbCat.insert(item,function(err,newDoc){
				if(serv)
					serv([newDoc]);
			});
		};
		var remCatDB = function(id,serv,callback){
			$rootScope.dbCat.remove({_id: id},{},function(err,num){
				serv(id,callback);
			});
		};
		return {
			addMainCat: addMainCat,
			getMainCat: getMainCat,
			addCat: addCat,
			getCat: getCat,
			getMainCatDB: getMainCatDB,
			getCatDB: getCatDB,
			addCatDB: addCatDB,
			remCatDB: remCatDB,
			remCat: remCat
		};
	}])

	.service('Item', ['$rootScope', function($rootScope){
		var listItems = [];
		var getItems = function(){
			return listItems;
		};
		var addItem = function(item){
			for (var obj in item){
				listItems.push(item[obj]);
			}
		};
		var remItem = function(id,callback){
			var newListItems=[];
			for (var obj in listItems){
				if (listItems[obj]._id != id){
					newListItems.push(listItems[obj]);
				}
			}
			listItems = newListItems;
			callback();
		};
		var getItemsDB = function(serv) {
			$rootScope.db.find({}).sort({'category.mainCat.pos':1}).exec(function(err, docs){
				serv(docs);
			});
		};
		var addItemDB = function(item,serv){
			$rootScope.db.insert(item,function(err,newDoc){
				serv([newDoc]);
			});
		};
		var getItemDB = function(id, callback){
			$rootScope.db.findOne({_id: id}, function(err,doc){
				callback(doc);
			});
		};
		var remItemDB = function(id,serv,callback){
			$rootScope.db.remove({_id: id},{},function(err,num){
				serv(id,callback);
			});
		};
		return {
			getItemsDB: getItemsDB,
			addItemDB: addItemDB,
			getItemDB: getItemDB,
			remItemDB: remItemDB,
			getItems: getItems,
			addItem: addItem,
			remItem: remItem
		};
	}])

	.factory('valForm', ['$filter', function($filter) {
		return function(form) {
			var err = [];
			if (form.name === null || form.name === '')
				err.push('Please check the Name section.');
			if (form.category.name != 'Dressing' && !form.isCat) {
				if(form.price === null)
					err.push('Please check the Price section.');
				if(form.lunch && form.lunchPrice === null)
					err.push('Please check the Lunch');
				if(form.desc === null || form.name === '')
					err.push('Please check the Description section.');
				item = {
					name: form.name,
					price: $filter('currency')(form.price,'',2),
					lunch: form.lunch,
					lunchPrice: $filter('currency')(form.lunchPrice,'',2),
					desc: form.desc,
					category: form.category
				};
			} else if(form.isCat){
				item ={
					name: form.name,
					mainCat: form.category
				};
			}else{
				item = {
					name: form.name,
					category: form.category
				};
			}
			if (err.length !== 0){
				return err;
			}else{
				return item;
			}
			
		};
	}]);