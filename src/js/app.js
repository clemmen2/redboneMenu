angular.module('setMenuApp', ['ngRoute', 'appControllers'])

	.config(['$routeProvider', function($routeProvider) {
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
			.when('/cat/:catId', {
				templateUrl: 'tmpl/cat.html'
			})
			.when('/catAdd/:catId', {
				templateUrl: 'tmpl/catadd.html'
			})
			.when('/', {
				redirectTo: '/create'
			});
	}])
	.run(['$rootScope', function($rootScope) {
		$rootScope.title='Redbone Set Menu';
	}]);