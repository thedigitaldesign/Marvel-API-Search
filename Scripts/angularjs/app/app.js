(function () {
    //-- Controller
    angular.module('app.marvel-univers', []);
    //-- Directives
    angular.module('app.directive.marvel-character-details', ['highcharts-ng']);
    //-- Services
    angular.module('app.services', []);
    //-- Filters
    angular.module('app.filters', []);

    angular.module('app', [
        'ngResource',
        'app.marvel-univers',
        'app.directive.marvel-character-details',
        'app.services',
        'app.filters'
    ]);
})();