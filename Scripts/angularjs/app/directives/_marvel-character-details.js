(function () {
    var app = angular.module('app.directive.marvel-character-details');

    app.directive('marvelCharacterDetails', [
        'GetMarvelCharacterInfo', 'GetMarvelCharacterHistoryByYear',
        function (GetMarvelCharacterInfo, GetMarvelCharacterHistoryByYear) {
        return {
            restrict: 'AE',
            templateUrl: 'Scripts/angularjs/app/views/_marvel-character-details.html',
            controller: function ($scope) {
                //-- Variables
                var character = this,
                    characterName = 'Wolverine',
                    characterId = 1009718;
                character.years = {};
                $scope.search = {};

                var CharacterDetails = function () {
                    character.details = {};

                    var totals = [],
                        years = [];

                    var today = new Date(),
                        yyyy = today.getFullYear();

                    var year = yyyy,
                        range = 5,
                        stop = year,
                        start = year - range;

                    //-- API
                    var GetCharacterDetails = GetMarvelCharacterInfo.query({
                        CharacterName: characterName
                    });

                    GetCharacterDetails.$promise.then(function (response) {
                        character.details = response.data.results[0];
                        characterId = character.details.id;
                        CharacterHistory([start, characterId]);
                    });

                    var CharacterHistory = function (data) {
                        characterId = data[1],
                        year = data[0];

                        var GetCharacterHistoryByYear = GetMarvelCharacterHistoryByYear.get({
                            CharacterId: characterId,
                            Year: year
                        });

                        GetCharacterHistoryByYear.$promise.then(function (response) {
                            totals.push(response.data.total);
                            years.push(year);

                            if (year !== stop) {
                                CharacterHistory([++year, characterId]);
                            } else {
                                CreateGraph(totals, years);
                                $('.ajax-loader').hide();
                            }
                        });
                    };

                    //-- highcharts-ng
                    function CreateGraph(totals, years) {
                        character.years = years;

                        $scope.chartSeries = [
                          { "name": "Comic appearances", "data": totals }
                        ];

                        $scope.chartConfig = {
                            options: {
                                chart: {
                                    type: 'areaspline'
                                },
                                plotOptions: {
                                    series: {
                                        stacking: ''
                                    }
                                }
                            },
                            series: $scope.chartSeries,
                            title: {
                                text: characterName + ' comic apperances'
                            },
                            xAxis: {
                                categories: years
                            },
                            yAxis: {
                                title: {
                                    text: 'Comic Appearances'
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            loading: false,
                            size: {}
                        }

                        $scope.reflow = function () {
                            $scope.$broadcast('highchartsng.reflow');
                        };
                    }
                };
                
                CharacterDetails();

                this.SearchCharacters = function (name) {
                    $('.ajax-loader').show();
                    $('.ajax-loader img').css({
                        'margin-top': $('.ajax-loader').height() / 2
                    });

                    characterName = name;
                    CharacterDetails();
                };
            },
            controllerAs: 'character'
        }
    }]);
})();