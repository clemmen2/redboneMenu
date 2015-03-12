angular.module('appControllers', ['appServices'])

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

	.controller('formCtrl', ['valForm', function(valForm){
		this.cat = [
			{name:'Entree', pos: 2},
			{name:'Appetizers', pos: 1},
			{name:'Grits and Specialties', mainCat: 'Entree'},
			{name:'Steaks', mainCat: 'Entree'},
			{name:'Pasta and Rice', mainCat: 'Entree'},
			{name:'Sandwiches', mainCat: 'Entree'},
			{name:'Salads', mainCat: 'Entree'},
			{name:'Dressing', pos: 4},
			{name:'Desert', pos: 3}
		];
		this.category = this.cat[0];
		this.whichForm = function(form){
			this.which = form;
		};
		this.add = function() {
			var val = valForm(this);
			if (val.constructor === Array){
				this.err = val;
			}else{
				this.err = [];
				console.log(val);
			};
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