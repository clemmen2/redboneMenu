(function () {
    angular.module('rbApp')
        .config(configure);
    configure.$inject = ['$routeProvider'];
    function configure ($routeProvider) {
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
        }
})();