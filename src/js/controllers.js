angular.module('appControllers', [])

	.controller('navManagement', [function(){
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
		
	}])

	.controller('formCtrl', ['$scope', 'valForm', 'Cat', 'Item', function($scope, valForm, Cat, Item){
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
					Cat.addCatDB(val,Cat.addCat);
					that.clear();
				}else{
					Item.addItemDB(val,Item.addItem);
					that.clear();
				}
			}
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
				if (id === null)
					that.err.push('Please select item to edit.');
			}else{
				that.err = [];
				if (id === null){
					that.err.push('Please select item to edit.');
				}else{
					val._id = id;
					console.log(val);
				}
			}
		};

		that.updateMainCat = function(){
			that.mainCat = Cat.getMainCat();
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

	.controller('treeCtrl', ['$scope','$routeParams','Item', 'Cat', function($scope,$routeParams,Item,Cat){
		var me = this;
		if($routeParams.catId){
			me.catId = $routeParams.catId;
		}
		me.update = function(){
			me.cats = Cat.getCat();
			me.items = Item.getItems();
		};
		me.update();
		me.removeItem = function(id) {
			Item.remItemDB(id,Item.remItem,function(){
				me.update();
				$scope.$apply();
			});
		};
		me.removeCat = function(id){
			console.log(id);
		};
	}]);