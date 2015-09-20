(function () {
    angular.module('rbApp')
        .constant('regexpConst', {
            NUM: /^\d*\.?\d*$/,
            FILTERNUM: /(\d*\.[0-9][1-9]|\d*\.[1-9]{1,2}|\d*)/,
            NAME: /^[a-z A-Z]*$/,
        });
})();