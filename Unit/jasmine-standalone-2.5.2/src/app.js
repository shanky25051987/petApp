var app = angular.module('moviesApp', []);

app.controller('MovieController', function movieController($scope, $http, $timeout) {
  var getMovieData = function getMovieData() {
    $http.get('http://www.omdbapi.com/', {
        params: { s: $scope.keyword }
      }).success(function(data, status, headers, config) {
        $scope.movies = data.Search;
      }).error(function(data, status, headers, config) {
        $scope.movies = [];
    });
  };
  
  /* On Load */
  $scope.movies = [];
  $scope.keyword = 'terminator';
  getMovieData();

});