(function () {
    var app = angular.module('app.services', ['ngResource']);

    //-- API calls
    var API_KEY = 'c2e0f435c1b7df99b1207e9daed83810';

    app.factory('GetMarvelCharacterInfo', ['$resource', function ($resource) {
        return $resource('http://gateway.marvel.com:80/v1/public/characters?name=:CharacterName&limit=1&apikey=:API_KEY',
            {
                CharacterName: 'Wolverine',
                API_KEY: API_KEY
            }, {
            query: {
                method: 'GET'
            }
        });
    }]);

    app.factory('GetMarvelCharacterHistoryByYear', ['$resource', function ($resource) {
        return $resource('http://gateway.marvel.com:80/v1/public/characters/:CharacterId/comics?format=comic&limit=:Limit&startYear=:Year&apikey=:API_KEY',
            {
                CharacterId: 1009718,
                Year: 2014,
                Limit: 1,
                API_KEY: API_KEY
            }, {
                query: {
                    method: 'GET'
                }
            });
    }]);
})();
