(function () {
    angular.module('rbApp')
        .run(run);
    run.$inject = ['$rootScope'];
    function run($rootScope) {
        $rootScope.title = 'Red Bone Alley';
    }
})();