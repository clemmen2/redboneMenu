angular.module('appControllers', ['appServices'])

	.controller('navManagement', ['getMainCat', 'getCat', 'Cat', 'mainCat', 'addCat', function(getMainCat, getCat, Cat, mainCat, addCat){
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
		if (mainCat.getCat().length == 0){
			getMainCat(mainCat.addCat,addCat);
		};
		if (Cat.getCat().length == 0){
			getCat(Cat.addCat);
		};
	}])

	.controller('formCtrl', ['$scope', 'valForm','getMainCat', 'getCat', 'Cat', 'mainCat', 'addCat', function($scope, valForm, getMainCat, getCat, Cat, mainCat, addCat){
		var that = this;
		that.whichForm = function(form){
			that.which = form;
		};
		that.add = function() {
			var val = valForm(that);
			if (val.constructor === Array){
				that.err = val;
			}else{
				that.err = [];
				if (that.isCat){
					addCat(val,Cat.addCat);
					that.name=null;
				}else{
					console.log(val)
				}
			};
		};
		that.clear = function() {
			that.name = null;
			that.price = null;
			that.desc = null;
			that.category = that.cat[0];
			that.lunch = false;
			that.lunchPrice = null;
			that._id = null;
			that.isCat = false;
			that.err = [];
		};
		that.edit = function(id) {
			var val = valForm(this);
			if (val.constructor === Array){
				that.err = val;
				if (id == null)
					that.err.push('Please select item to edit.');
			}else{
				that.err = [];
				if (id == null){
					that.err.push('Please select item to edit.');
				}else{
					val._id = id;
					console.log(val);
				};
			};
		};

		that.updateMainCat = function(){
			that.mainCat = mainCat.getCat();
		};

		that.updateCat = function(){
			that.cat = Cat.getCat();
		};

		that.isCatChange = function(){
			if(that.isCat){
				that.name = null;
				that.updateMainCat();
				that.category = that.mainCat[0];
			}else{
				that.name = null;
				that.updateCat();
				that.category = that.cat[0];
			}
		};
		that.isCatChange();	
	}])

	.controller('treeCtrl', [function(){

	}])