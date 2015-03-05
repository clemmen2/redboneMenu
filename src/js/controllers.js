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
	});