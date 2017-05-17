var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

app.controller("myCtrl", function ($scope, $routeParams, $location, $http) {

    $scope.data = {};

    $scope.location = $location.search();
    if ($scope.location.v === undefined) {
        $location.search('v', '');
        $scope.location = $location.search();
    } else {
        $http.get('/historical/' + $scope.location.v).then(
            function (response) {
                $scope.data = response.data;
            },
            function (error) {

            }
        )
    }

});

app.filter('fromNow', function () {
    return function (input) {
        return moment(input).fromNow();
    };
});