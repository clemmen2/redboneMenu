angular.module('appServices',[])
.service('category',[function(){
	var category = {};
	var cat=[
			{name:'Desserts', require: null, mainCat:{name:'Desserts', pos:'3'}},
			{name:'Dressing', require: null, mainCat:{name:'Dressing', pos:'4'}},
			{name:'Appetizers', require: null, mainCat:{name:'Appetizers', pos:'1'}},
			{name:'Grits and Specialties', require: null, mainCat:{name:'Entrees', pos:'2'}},
			{name:'Steaks', require: null, mainCat:{name:'Entrees', pos:'2'}},
			{name:'Pasta and Rice', require: null, mainCat:{name:'Entrees', pos:'2'}},
			{name:'Sandwiches', require: null, mainCat:{name:'Entrees', pos:'2'}},
			{name:'Salads', require: 'Dressing', mainCat:{name:'Entrees', pos:'2'}}
			
		];
	var mainCat= [
		{name:'Appetizers', pos:'1'},
		{name:'Entrees',pos:'2'},
		{name:'Desserts',pos:'3'},
		{name:'Dressing',pos:'4'}
	];
	category.getCatDB = function(){
		return cat;
	};
	category.getMainCatDB = function(){
		return mainCat;
	};
	return category;
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
			if (item.price === null){
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
				if (item.lunchPrice === null){
					createError('Please supply a lunch price for the item.');
				}else if(!numRegExp.test(item.lunchPrice)){
					createError('Please supply a valid lunch price for the item.');
				}else{
					priceArray = filterNumRegExp.exec(item.lunchPrice);
					item.lunchPrice = priceArray[1];
				}
			}
		}else{
			item.price = null;
			item.desc = '';
			item.lunch = false;
			item.lunchPrice = null;
		}
		return {err: err, item: item};
	};
}]);
