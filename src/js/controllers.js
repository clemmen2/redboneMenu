angular.module('appControllers', ['appServices','ngRoute'])

	.controller('navManagement', [function(){
		var nav =this;
		var gui = require('nw.gui');
		var win = gui.Window.get();
		win.isMax = false;
		nav.index = 1;
		nav.setPage = function(index) {
			nav.index = index;
		};
		nav.winMin = function() {
			win.minimize();
		};
		nav.winClose = function() {
			win.close();
		};
		nav.winMax = function() {
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

	.controller('formCtrl', ['$timeout','$scope', 'category','item','$filter', 'valForm', function($timeout,$scope,cat,item,$filter, valForm){
		var that = this;
		that.err = [];
		that.item={name:'',price:null,lunch: false,lunchPrice: null,desc:'',_id: null};
		cat.getCatsDB(function(cats){
			$timeout(function(){
				that.cats = $filter('orderBy')(cats,'pos');
				that.item.category = that.cats[0];
			},0);
		});
		function clearForm(){
			that.item={name:'',price:null,lunch: false,lunchPrice: null,desc:'',category:that.cats[0], _id: null};
			that.err = [];
		}
		that.whichForm = function(form){
			that.which = form;
		};
		that.add = function() {
			newItem = valForm(that.item);
			that.err = [];
			if (newItem.err.length > 0){
				for (var err in newItem.err)
					that.err.push(newItem.err[err]);
			}else{
				item.putItemDB(newItem.item);
				clearForm();
			}
		};
		that.clear = function() {
			clearForm();
		};
		that.edit = function() {
			item.editItem(that.item);
			clearForm();
		};
		$scope.$on('editItem', function(){
			that.item = item.getToForm();
			that.item.category = that.cats[that.item.category.pos-1];
			if (that.item.lunchPrice === '')
				that.item.lunch = false;
			else
				that.item.lunch = true;

		});	
	}])

	.controller('treeCtrl', ['category','item','$filter','$routeParams','$scope', function(cat,item,$filter,$routeParams,$scope){
		var me = this;
		cat.getCatsDB(function(cats){
			me.cats = $filter('orderBy')(cats,'mainCat.pos');
		});
		item.getItemsDB(function(its){
			me.items = its;
		});
		me.catId = $routeParams.catId;
		me.removeCat = function(id){
			console.log('Removing category with id ' + id);
		};
		me.removeItem = function(id){
			item.removeItem(id);
			item.getItemsDB(function(items){
				me.items = items;
			});
		};
		me.addToForm = function(id){
			item.toForm(id);
		};
	}]);