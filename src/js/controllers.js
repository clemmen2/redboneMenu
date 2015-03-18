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

	.controller('formCtrl', ['$scope', 'category','item','$filter', 'valForm', function($scope,cat,item,$filter, valForm){
		var that = this;
		that.err = [];

		that.cats = $filter('orderBy')(cat.getCatDB(),'mainCat.pos');
		that.item={name:'',price:null,lunch: false,lunchPrice: null,desc:'',category:that.cats[0]};
		function clearForm(){
			that.item={name:'',price:null,lunch: false,lunchPrice: null,desc:'',category:that.cats[0]};
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
		that.edit = function(id) {
			
		};
		$scope.$on('editItem', function(){
			that.item = item.getToForm();
		});	
	}])

	.controller('treeCtrl', ['category','item','$filter','$routeParams', function(cat,item,$filter,$routeParams){
		var me = this;
		me.cats = $filter('orderBy')(cat.getCatDB(),'mainCat.pos');
		me.items = item.getItemsDB();
		me.catId = $routeParams.catId;
		me.removeCat = function(id){
			console.log('Removing category with id ' + id);
		};
		me.removeItem = function(id){
			console.log('Removing item with id ' + id);
		};
		me.addToForm = function(id){
			item.toForm(id);
		};
	}]);