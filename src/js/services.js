angular.module('appServices',[])

	.factory('getItems', function(){
		return item = [
			{name:"Shrimp and Grits"},
			{name:"Pontable"},
			{name:"Leo"}
		];
	})

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
				};
			} else {
				var item = {
					name: form.name,
					category: form.category,
				};
			};
			if (err.length != 0){
				return err;
			}else{
				return item;
			};
			
		};
	}])