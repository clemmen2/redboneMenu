angular.module('appServices',[])

	.factory('getMainCat', ['$rootScope', function($rootScope){
		return function(serv,backup) {
			$rootScope.dbCat.find({mainCat:{$exists: false}}).sort({pos: 1}).exec(function(err, docs){
				if(docs.length == 0){
					docs.push({name: 'Appetizers', pos: 1});
					docs.push({name: 'Entrees', pos: 2});
					docs.push({name: 'Desserts', pos: 3});
					docs.push({name: 'Dressing', pos: 4});
					backup(docs);
				};
				serv(docs);
			});
		};
	}])

	.service('mainCat', [function(){
		var mainCatList = new Array;
		var addCat = function(cat){
			for (var obj in cat) {
				mainCatList.push(cat[obj]);
			};
		};
		var getCat = function(){
			return mainCatList;
		};
		return {
			addCat: addCat,
			getCat: getCat
		}
	}])

	.factory('getCat', ['$rootScope', function($rootScope){
		return function(serv) {
			$rootScope.dbCat.find({mainCat:{$exists: true}}).sort({'mainCat.pos' : 1,name: 1}).exec(function(err, docs){
				serv(docs);
			});
		};
	}])

	.service('Cat', [function($rootScope){
		var CatList = new Array;
		var addCat = function(cat){
			for (var obj in cat){
				CatList.push(cat[obj]);
			};
		};
		var getCat = function(){
			return CatList;
		};
		return {
			addCat: addCat,
			getCat: getCat
		}
	}])

	.factory('addCat', ['$rootScope', function($rootScope){
		return function(item,serv){
			$rootScope.dbCat.insert(item,function(err,newDoc){
				if(serv)
					serv([newDoc]);
			});
		};
	}])

	.factory('remCat', ['$rootScope', function($rootScope){
		return function(id){
			$rootScope.dbCat.remove({_id: id},{});
		};
	}])

	.factory('getItems', ['$rootScope', function($rootScope){
		return function(callback) {
			$rootScope.db.find({}, function(err, docs){
				callback(docs);
			});
		};
	}])

	.factory('addItem', ['$rootScope', function($rootScope){
		return function(item){
			$rootScope.db.insert(item);
		};
	}])

	.factory('getItem', ['$rootScope', function($rootScope){
		return function(id, callback){
			$rootScope.db.findOne({_id: id}, function(err,doc){
				callback(doc);
			});
		};
	}])

	.factory('remItem', ['$rootScope', function($rootScope){
		return function(id){
			$rootScope.db.remove({_id: id},{});
		};
	}])

	.factory('valForm', ['$filter', function($filter) {
		return function(form) {
			var err = [];
			if (form.name == null || form.name == '')
				err.push('Please check the Name section.');
			if (form.category.name != 'Dressing' && !form.isCat) {
				if(form.price == null)
					err.push('Please check the Price section.');
				if(form.lunch && form.lunchPrice == null)
					err.push('Please check the Lunch');
				if(form.desc == null || form.name == '')
					err.push('Please check the Description section.');
				var item = {
					name: form.name,
					price: $filter('currency')(form.price,'',2),
					lunch: form.lunch,
					lunchPrice: $filter('currency')(form.lunchPrice,'',2),
					desc: form.desc,
					category: form.category
				};
			} else if(form.isCat){
				var item ={
					name: form.name,
					mainCat: form.category
				}
			}else{
				var item = {
					name: form.name,
					category: form.category
				};
			};
			if (err.length != 0){
				return err;
			}else{
				return item;
			};
			
		};
	}])