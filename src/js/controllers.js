angular.module('appControllers', [])

	.controller('navManagement', function(){
		var gui = require('nw.gui');
		var win = gui.Window.get();
		win.isMax = false;
		this.index = 1;
		this.setPage = function(index) {
			this.index = index;
		};
		this.winMin = function() {
			win.minimize();
		};
		this.winClose = function() {
			win.close();
		};
		this.winMax = function() {
			if (win.isMax)
				win.unmaximize();
			else
				win.maximize();
		};
		win.on('maximize', function(){
			win.isMax = true;
		});
		win.on('unmaximize', function(){
			win.isMax = false;
		});
	})

	.controller('formCtrl', ['$filter', function($filter){
		this.cat = [
			{name:'Entree', pos: 2},
			{name:'Appetizers', pos: 1},
			{name:'Grits and Specialties', mainCat: 'Entree'},
			{name:'Steaks', mainCat: 'Entree'},
			{name:'Pasta and Rice', mainCat: 'Entree'},
			{name:'Sandwiches', mainCat: 'Entree'},
			{name:'Salads', mainCat: 'Entree'},
			{name:'Dressing', pos: 3}
		];
		this.category = this.cat[0];
		this.whichForm = function(form){
			this.which = form;
		};
		this.add = function() {
			this.err = [];
			if (this.name == null || this.name == '')
				this.err.push('Name');
			if (this.category.name != 'Dressing') {
				if(this.price == null)
					this.err.push('Price');
				if(this.lunch && this.lunchPrice == null)
					this.err.push('Lunch');
				if(this.desc == null || this.name == '')
					this.err.push('Description');
				var item = {
					name: this.name,
					price: $filter('currency')(this.price,'',2),
					lunch: this.lunch,
					lunchPrice: $filter('currency')(this.lunchPrice,'',2),
					desc: this.desc,
					category: this.category,
				};
			} else {
				var item = {
					name: this.name,
					category: this.category,
				};
			};
			if(this.err.length == 0)
				console.log(item);
		};
		this.clear = function() {
			this.name = '';
			this.price = null;
			this.desc = '';
			this.category = this.cat[0];
			this.lunch = false;
			this.lunchPrice = null;
			this.err = [];
		};
		this.edit = function() {
			console.log('Editing.')
		};

	}]);