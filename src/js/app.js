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
	});