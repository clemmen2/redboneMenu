angular.module('appServices',[])

	.factory('getCat', ['$rootScope', function($rootScope){
		return function(callback) {
			$rootScope.db.find({isCat: true}, function(err, docs){
				callback(docs);
			});
		};
	}])

	.factory('getItems', ['$rootScope', function($rootScope){
		return function(callback) {
			$rootScope.db.find({isCat: false}, function(err, docs){
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
				err.push('Name');
			if (form.category.name != 'Dressing') {
				if(form.price == null)
					err.push('Price');
				if(form.lunch && form.lunchPrice == null)
					err.push('Lunch');
				if(form.desc == null || form.name == '')
					err.push('Description');
				var item = {
					name: form.name,
					price: $filter('currency')(form.price,'',2),
					lunch: form.lunch,
					lunchPrice: $filter('currency')(form.lunchPrice,'',2),
					desc: form.desc,
					category: form.category,
					isCat: false
				};
			} else {
				var item = {
					name: form.name,
					category: form.category,
					isCat: false
				};
			};
			if (err.length != 0){
				return err;
			}else{
				return item;
			};
			
		};
	}])