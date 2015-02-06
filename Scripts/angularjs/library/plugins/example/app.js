'use strict';

var myapp = angular.module('myapp', ["highcharts-ng"]);

myapp.controller('myctrl', function ($scope) {

    $scope.chartTypes = [
      { "id": "line", "title": "Line" },
      { "id": "spline", "title": "Smooth line" },
      { "id": "area", "title": "Area" },
      { "id": "areaspline", "title": "Smooth area" },
      { "id": "column", "title": "Column" },
      { "id": "bar", "title": "Bar" },
      { "id": "pie", "title": "Pie" },
      { "id": "scatter", "title": "Scatter" }
    ];

    $scope.dashStyles = [
      { "id": "Solid", "title": "Solid" },
      { "id": "ShortDash", "title": "ShortDash" },
      { "id": "ShortDot", "title": "ShortDot" },
      { "id": "ShortDashDot", "title": "ShortDashDot" },
      { "id": "ShortDashDotDot", "title": "ShortDashDotDot" },
      { "id": "Dot", "title": "Dot" },
      { "id": "Dash", "title": "Dash" },
      { "id": "LongDash", "title": "LongDash" },
      { "id": "DashDot", "title": "DashDot" },
      { "id": "LongDashDot", "title": "LongDashDot" },
      { "id": "LongDashDotDot", "title": "LongDashDotDot" }
    ];

    $scope.chartSeries = [
      //{"name": "Some data", "data": [0, 1, 2, 6, 67, 171]}
      { "name": "Wolverien Comic Appearance", "data": [171, 67, 6, 2, 1, 0] }

      //{ "name": "Wolverien Comic Appearance: 2010", "data": [171] },
      //{ "name": "Wolverien Comic Appearance: 2011", "data": [67] },
      //{ "name": "Wolverien Comic Appearance: 2012", "data": [6] },
      //{ "name": "Wolverien Comic Appearance: 2013", "data": [2] },
      //{ "name": "Wolverien Comic Appearance: 2014", "data": [1] },
      //{ "name": "Wolverien Comic Appearance: 2015", "data": [0] }


      //{"name": "Some data 3", "data": [3, 1, null, 5, 2], connectNulls: true},
      //{"name": "Some data 2", "data": [5, 2, 2, 3, 5], type: "column"},
      //{"name": "My Super Column", "data": [1, 1, 2, 3, 2], type: "column"}
    ];

    $scope.chartStack = [
      { "id": '', "title": "No" },
      { "id": "normal", "title": "Normal" },
      { "id": "percent", "title": "Percent" }
    ];

    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series;
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.removeSeries = function (id) {
        var seriesArray = $scope.chartConfig.series;
        seriesArray.splice(id, 1)
    }

    $scope.toggleHighCharts = function () {
        this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks
    }

    $scope.replaceAllSeries = function () {
        var data = [
          { name: "first", data: [10] },
          { name: "second", data: [3] },
          { name: "third", data: [13] }
        ];
        $scope.chartConfig.series = data;
    };

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
            text: 'Hello'
        },
        xAxis: {
            categories: ['2010', '2011', '2012', '2013', '2014', '2015']
        },
        yAxis: {
            title: {
                text: 'Appearance in comics'
            }
        },
        credits: {
            enabled: true
        },
        loading: false,
        size: {}
    }

    $scope.reflow = function () {
        $scope.$broadcast('highchartsng.reflow');
    };


});