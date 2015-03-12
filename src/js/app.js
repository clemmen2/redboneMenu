angular.module('setMenuApp', ['ngRoute', 'appControllers'])

	.config(function($routeProvider) {
		$routeProvider
			.when('/create', {
				templateUrl: 'tmpl/create.html'
			})
			.when('/edit', {
				templateUrl: 'tmpl/edit.html'
			})
			.when('/add', {
				templateUrl: 'tmpl/add.html'
			})
			.when('/', {
				redirectTo: '/create'
			})
	})
	.run(function($rootScope) {
		$rootScope.title='Redbone Set Menu';
		var datastore = require('nedb');
		var path = require('path');
		$rootScope.db = new datastore({ filename: path.join(require('nw.gui').App.dataPath, 'menu.db'), autoload: true });
		$rootScope.dbCat = new datastore({ filename: path.join(require('nw.gui').App.dataPath, 'cat.db'), autoload: true });
	});